import { Injectable } from '@angular/core';

import { providers, getDefaultProvider, utils, Contract, Wallet as EthersWallet } from 'ethers';
import { toASCII } from 'punycode';
import { baseEnsDomain, network, factoryContract } from '@env';
import { ERC1077, Factory2 } from '@blockframes/contracts';
import { WalletStore } from './wallet.store';
import { KeyManagerService, KeyManagerQuery } from '../../key-manager/+state';
import { Relayer } from '../../relayer/relayer';
import { Tx, MetaTx, SignedMetaTx } from '../../types';

@Injectable({ providedIn: 'root' })
export class WalletService {

  provider: providers.Provider

  constructor(
    private keyManagerQuery: KeyManagerQuery,
    private store: WalletStore,
    private keyManager: KeyManagerService,
    private relayer: Relayer,
  ) {}

  public async updateFromEmail(email: string) {
    this.store.setLoading(true);
    const ensDomain = this.emailToEnsDomain(email);
    const address = await this.retreiveAddress(ensDomain);
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
  public async retreiveAddress(ensDomain: string) {
    this._requireProvider();
    const address = await this.provider.resolveName(ensDomain);
    if(!!address){
      this.store.update({hasERC1077: true});
      return address;
    }
    return await this.precomputeAddress(ensDomain);
  }

  /**
   * This function precompute a contract address as defined in the EIP 1014 (Skinny Create 2)
   * @param ensDomain this is use as a salt (salt need to be unique for each user)
   * @param publicKey this is used in the smart-contract constructor argument
   */
  public async precomputeAddress(ensDomain: string) {
    this._requireProvider();

    const factoryAddress = await this.provider.resolveName(factoryContract);

    // retreive init code
    const factory2 = new Contract(factoryAddress, Factory2.abi, this.provider);
    const initCode = await factory2.getInitCode();

    // CREATE2 address
    let payload = '0xff';
    payload += factoryAddress.substr(2);
    payload += utils.keccak256(utils.toUtf8Bytes(ensDomain.split('.')[0])).substr(2); // salt
    payload += utils.keccak256(initCode).substr(2);
    return `0x${utils.keccak256(payload).slice(-40)}`;
  }

  private _requireProvider() {
    if(!this.provider) {
      this.provider = getDefaultProvider(network);
    }
  }

  public async createRandomKeyFromEmail(keyName: string, email: string, password?: string) {
    const ensDomain = this.emailToEnsDomain(email);
    const key = await this.keyManager.createFromRandom(keyName, ensDomain, password);
    this.keyManager.storeKey(key);
    return key;
  }

  public async deployERC1077(ensDomain: string) {
    // TODO check if not already deployed
    let pubKey = null;
    try{
      pubKey = this.keyManagerQuery.getMainKeyOfUser(ensDomain).address;
    } catch(error) {
      throw new Error('You are trying to deploy an ERC1077 without any key');
    }
    return this.relayer.create(ensDomain.split('.')[0], pubKey, await this.precomputeAddress(ensDomain));
  }

  private getUsersERC1077(ensDomainOrAddress: string) {
    this._requireProvider();
    return new Contract(ensDomainOrAddress, ERC1077.abi, this.provider);
  }

  private hashMetaTx(from: string, metaTx: MetaTx) {
    return utils.solidityKeccak256([
      'address', // from
      'address', // to
      'uint256', // value
      'bytes32', // keccak256(data)
      'uint256', // nonce
      'uint256', // gasPrice
      'address', // gasToken
      'uint256', // gasLimit
      'uint8' // operationType
    ], [
      from, metaTx.to, metaTx.value, utils.keccak256(metaTx.data), metaTx.nonce, // tx
      metaTx.gasPrice, metaTx.gasToken, metaTx.gasLimit, // gas
      metaTx.operationType // op type
    ]);
  }

  private signedMetaTxToData(signedMetaTx: SignedMetaTx) {
    const abiCoder = new utils.AbiCoder();
    return abiCoder.encode([
      'address', // to
      'uint256', // value
      'bytes', // data
      'uint256', // nonce
      'uint256', // gasPrice
      'address', // address
      'uint256', // gasLimit
      'uint8', // operationType
      'bytes', // signatures
    ],[
      signedMetaTx.to, signedMetaTx.value, signedMetaTx.data, signedMetaTx.nonce, // tx
      signedMetaTx.gasPrice, signedMetaTx.gasToken, signedMetaTx.gasLimit, // gas
      signedMetaTx.operationType, // op type
      signedMetaTx.signatures, // signature
    ]);
  }

  private async prepareMetaTx(ensDomain: string, tx: Tx, wallet: EthersWallet): Promise<SignedMetaTx> {
    this._requireProvider();
    const from = await this.provider.resolveName(ensDomain);
    const erc1077 = this.getUsersERC1077(from);

    // prepare
    const metaTx = {
      ...tx,
      nonce: await erc1077.lastNonce(),
      gasPrice: await this.provider.getGasPrice().then(bigNum => bigNum.toHexString()),
      gasLimit: '0x0', // temporary gas limit
      gasToken: '0x0000000000000000000000000000000000000000', // zero address means ether instead of erc20
      operationType: '0x0', // required but not used in the contract yet
    }

    // estimate gas
    const mockTxHash = this.hashMetaTx(from, metaTx);
    const mockSignature = await wallet.signMessage(mockTxHash);
    const mockSignedMetaTx: SignedMetaTx = {...metaTx, signatures: mockSignature};
    const mockTx: providers.TransactionRequest = {
      to: from,
      value: 0,
      data: this.signedMetaTxToData(mockSignedMetaTx),
    }
    const estimatedGasLimit = await this.provider.estimateGas(mockTx).then(bigNum => bigNum.toHexString());

    // hash & sign
    metaTx.gasLimit = estimatedGasLimit;
    const txHash = this.hashMetaTx(from, metaTx);
    const signature = await wallet.signMessage(txHash);
    return {...metaTx, signatures: signature};
  }
}
