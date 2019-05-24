import { Injectable } from '@angular/core';

import { providers, getDefaultProvider, utils } from 'ethers';
import { toASCII } from 'punycode';
import { baseEnsDomain, network, factoryContract } from '@env';
import { bytecode as contractCode } from '../../../../../../contracts/build/ERC1077.json';
import { WalletStore } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletService {

  provider: providers.Provider

  constructor(
    private store: WalletStore
  ) {}

  public async updateFromEmail(email: string) {
    this.store.setLoading(true);
    const ensDomain = this.emailToEnsDomain(email);
    const address = await this.retreiveAddress(ensDomain, '0x0000000000000000000000000000000000000000'); // TODO use a real pubK from the Key Manager
    this.addBalanceListener(address);
    this.store.update({ensDomain, address});
    this.store.setLoading(false);
  }

  /**
   * Convert email to username and sanitize it:
   * convert to lower case punycode and replace special chars by their ASCII code
   * then add base ens domain
   * @example `漢micHel+9@exemple.com` -> `xn--michel439-2c2s.blockframes.eth`
   */
  public emailToEnsDomain(email: string) {
    return toASCII(email.split('@')[0]).toLowerCase()
      .split('')
      .map(char => /[^\w\d-.]/g.test(char) ? char.charCodeAt(0) : char) // replace every non a-z or 0-9 chars by their ASCII code : '?' -> '63'
      .join('') + '.' + baseEnsDomain;
  }

  /**
   * Get address of the given ENS domain, if this ENS domain doesn't exist
   * (i.e. the ERC1077 is not yet deployed) we precompute the address with CREATE2
   * @param ensDomain the full ENS domain : `alice.blockframes.eth`
   */
  public async retreiveAddress(ensDomain: string, publicKey: string) {
    this._requireProvider();
    const address = await this.provider.resolveName(ensDomain);
    if(!!address){
      this.store.update({hasERC1077: true});
      return address;
    }
    return await this.precomputeAddress(ensDomain, publicKey);
  }

  /**
   * This function precompute a contract address as defined in the EIP 1014
   * @param ensDomain this is use as a salt (salt need to be unique for each user)
   */
  public async precomputeAddress(ensDomain: string, publicKey: string) {
    this._requireProvider();

    // compute full contract byte code
    const abiEncoder = new utils.AbiCoder();
    const constructorArgs = abiEncoder.encode(['address'], [publicKey]).replace(/0x/, '');
    const byteCode = `0x${contractCode}${constructorArgs}`;

    // CREATE2 address
    const factoryAddress = await this.provider.resolveName(factoryContract);
    const payload = '0x' + [
      'ff',
      factoryAddress,
      utils.keccak256(utils.toUtf8Bytes(ensDomain)), //! THIS IS NOT SECURE anybody can guess the salt
      utils.keccak256(byteCode)
    ].map(part => part.replace(/0x/, '')).join('');
    return `0x${utils.keccak256(payload).slice(-40)}`;
  }

  private _requireProvider() {
    if(!this.provider) {
      this.provider = getDefaultProvider(network);
    }
  }

  public addBalanceListener(address: string){
    this._requireProvider();
    this.provider.on(address, (newBalance: utils.BigNumber) => this.store.update({balance: utils.formatEther(newBalance)}));
  }

  public cleanWallet() {
    delete this.provider;
  }
}
