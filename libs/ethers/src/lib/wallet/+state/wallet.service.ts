import { Injectable } from '@angular/core';

import { providers, getDefaultProvider, utils, Contract, Wallet as EthersWallet } from 'ethers';
import { toASCII } from 'punycode';
import { baseEnsDomain, network, factoryContract } from '@env';
import { ERC1077, Factory2 } from '@blockframes/contracts';
import { WalletStore } from './wallet.store';
import { KeyManagerService, KeyManagerQuery } from '../../key-manager/+state';
import { Relayer } from '../../relayer/relayer';
import { MetaTx, SignedMetaTx, Tx } from '../../types';
import { WalletQuery } from './wallet.query';
import { getMockTx } from './wallet-known-tx';

@Injectable({ providedIn: 'root' })
export class WalletService {

  provider: providers.Provider

  constructor(
    private query: WalletQuery,
    private store: WalletStore,
    private keyManager: KeyManagerService,
    private relayer: Relayer,
  ) {}

  public async updateFromEmail(email: string) {
    const ensDomain = this.emailToEnsDomain(email);
    const address = await this.retreiveAddress(ensDomain);
    this.store.update({ensDomain, address});
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
    if (!!address){
      const code = await this.provider.getCode(ensDomain);
      if (code !== '0x') {
        this.store.update({hasERC1077: true});
        return address;
      }
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

    // CREATE2 address
    let payload = '0xff';
    payload += factoryAddress.substr(2);
    payload += utils.keccak256(utils.toUtf8Bytes(ensDomain.split('.')[0])).substr(2); // salt
    payload += utils.keccak256(`0x${ERC1077.bytecode}`).substr(2);
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

  public async deployERC1077(ensDomain: string, pubKey: string) {
    if (this.query.getValue().hasERC1077) {
      throw new Error('Your smart-wallet is already deployed');
    }
    this.store.setLoading(true);
    try {
      const name = ensDomain.split('.')[0]; // `alice.blockframes.eth` -> `alice`
      const erc1077Address = await this.precomputeAddress(ensDomain);
      const result = await this.relayer.deploy(name, pubKey, erc1077Address);
      this.relayer.registerENSName(name, erc1077Address); // do not wait for ens register, this can be done in the background
      this.store.update({hasERC1077: true})
      this.store.setLoading(false);
      return result;
    } catch(err) {
      this.store.setLoading(false);
      console.error(err);
      throw new Error('Deploy seems to have failed, but firebase function is maybe still runing');
    }
  }

  private getUsersERC1077(ensDomainOrAddress: string) {
    this._requireProvider();
    return new Contract(ensDomainOrAddress, ERC1077.abi, this.provider);
  }

  public async setDeleteKeyTx(pubKey: string) {
    this.setTx(getMockTx()); // TODO use getDeleteKeyTx
    // TODO call key manager delete key to delete localy after the tx has been mined
  }

  public setTx(tx: Tx) {
    this.store.update({tx});
  }

  private hashMetaTx(from: string, metaTx: MetaTx) {
    return this.getUsersERC1077(from).calculateMessageHash(
      from, metaTx.to, metaTx.value, metaTx.data, metaTx.nonce, // tx
      metaTx.gasPrice, metaTx.gasToken, metaTx.gasLimit, // gas
      metaTx.operationType // op type
    );
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

  public async prepareMetaTx(ensDomain: string, wallet: EthersWallet): Promise<SignedMetaTx> {
    this._requireProvider();
    const from = this.query.getValue().address;
    const erc1077 = this.getUsersERC1077(from);

    // prepare
    const metaTx = {
      ...this.query.getValue().tx,
      nonce: await erc1077.getLastNonce(),
      gasPrice: await this.provider.getGasPrice().then(bigNum => bigNum.toHexString()),
      gasLimit: '0x0', // temporary gas limit
      gasToken: '0x0000000000000000000000000000000000000000', // zero address means ether instead of erc20
      operationType: '0x0', // required but not used in the contract yet
    }

    // estimate gas
    const mockTxHash = await this.hashMetaTx(from, metaTx);
    const mockSignature = await wallet.signMessage(mockTxHash);
    const mockSignedMetaTx: SignedMetaTx = {...metaTx, signatures: mockSignature};
    const mockTx: providers.TransactionRequest = {
      to: from,
      value: 0,
      data: this.signedMetaTxToData(mockSignedMetaTx),
    }
    const estimatedGasLimit = await this.provider.estimateGas(mockTx).then(bigNum => bigNum.toHexString());

    // hash & sign
    metaTx.gasLimit = estimatedGasLimit; // replace temporary gasLimit by its estimation
    const txHash = await this.hashMetaTx(from, metaTx);
    const signature = await wallet.signMessage(utils.arrayify(txHash));
    return {...metaTx, signatures: signature};
  }

  public async sendSignedMetaTx(ensDomain: string, signedMetaTx: SignedMetaTx) {
    return this.relayer.send(await this.retreiveAddress(ensDomain.split('.')[0]), signedMetaTx);
  }

  public async waitForTx(txHash: string) {
    this._requireProvider();
    return this.provider.waitForTransaction(txHash);
  }
}
