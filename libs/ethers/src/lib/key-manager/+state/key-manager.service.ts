import { Injectable } from '@angular/core';
import { KeyManagerStore } from './key-manager.store';
import { InfuraProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

// import from @ethersproject cause a weird runtime error : 'global' is undefined
import { Wallet as EthersWallet } from '@ethersproject/wallet';

import { KeyManagerQuery } from './key-manager.query';
import { network } from '@env';
import { ERC1077 } from '@blockframes/contracts';
import { Key } from '@blockframes/utils';
import { SigningKey } from '@ethersproject/signing-key';
import { mnemonicToEntropy, entropyToMnemonic } from '@ethersproject/hdnode';

@Injectable({ providedIn: 'root' })
export class KeyManagerService {

  private signingKey: SigningKey;

  constructor(
    private store: KeyManagerStore,
    private query: KeyManagerQuery,
  ) {}

  /** Set signing key into process memory */
  private setSigningKey(wallet: EthersWallet) {
    this.signingKey = new SigningKey(wallet.privateKey);
  }

  private requireSigningKey() {
    if (!this.signingKey) {
      throw new Error('A signing key is required !');
    }
  }

  private async encrypt(keyName: string, wallet: EthersWallet, ensDomain: string, encryptionPassword: string): Promise<Key> {
    this.store.setLoading(true);
    const keyStore = await wallet.encrypt(encryptionPassword);
    let isMainKey = false;
    if (this.query.getKeyCountOfUser(ensDomain) === 0) {
      isMainKey = true;
    }
    const key = {name: keyName, address: wallet.address, ensDomain, keyStore, isMainKey, isLinked: false};
    this.store.setLoading(false);
    return key;
  }

  /**  create / encrypt / from random */
  async createFromRandom(keyName: string, ensDomain: string, password: string): Promise<Key> {
    const wallet = EthersWallet.createRandom();
    return await this.encrypt(keyName, wallet, ensDomain, password);
  }

  /** create / encrypt / from mnemonic
  * @param keyName the name of the new key
  * @param ensDomain the ens name of the new key owner
  * @param mnemonic the seed phrase to transform into a new key
  * @param encryptionPassword a password to encrypt the new key
  */
  async importFromMnemonic(keyName:string, ensDomain: string, mnemonic: string, encryptionPassword: string) {
    const privateKey = mnemonicToEntropy(mnemonic); // mnemonic is a 24 word phrase corresponding to private key !== BIP32/39 seed phrase
    return this.importFromPrivateKey(keyName, ensDomain, privateKey, encryptionPassword);
  }

  /** create / encrypt / from private key
  * @param keyName the name of the new key
  * @param ensDomain the ens name of the new key owner
  * @param privateKey the private key to transform into a new key
  * @param encryptionPassword a password to encrypt the new key
  */
  async importFromPrivateKey(keyName:string, ensDomain: string, privateKey: string, encryptionPassword: string) {
    const wallet = new EthersWallet(privateKey);
    return this.encrypt(keyName, wallet, ensDomain, encryptionPassword);
  }

  /**
  * create or update a key into the vault
  */
  public storeKey(key: Key) {
    this.store.upsert(key.address, key);
  }

  async importFromJsonFile(jsonString: string) {
    const {address, ensDomain, keyStore} = JSON.parse(jsonString);
    let isMainKey = false;
    if (this.query.getKeyCountOfUser(ensDomain) === 0) {
      isMainKey = true;
    }
    const provider = new InfuraProvider(network);
    const erc1077 = new Contract(ensDomain, ERC1077.abi, provider);
    const isLinked = await erc1077.keyExist(address);
    this.store.add({name, address, ensDomain, keyStore, isMainKey, isLinked});
  }

  /**
   * load key (retrieve / decrypt, set into process memory).
   * Set the KeyManager loading flag to `true` during decryption.
   */
  async unlockKey(key: Key, encryptionPassword: string) {

    this.store.setLoading(true);
    try {
      const wallet = await EthersWallet.fromEncryptedJson(key.keyStore, encryptionPassword)
      this.store.setLoading(false);
      return wallet;
    }
    catch(error) {
      this.store.setLoading(false);
      throw new Error('Invalid Password');
    };
  }

  /** clean process memory */
  deactivateKey() {
    this.store.setActive(null);
    delete this.signingKey;
  }

  /** delete a stored key (from the storage)*/
  async deleteKey(key: Key) {
    this.store.remove(key.address);
  }

  /** get the default name of the next key to create : `Key_1`, `Key_2`, `Key_3`, etc... */
  getDefaultKeyName(ensDomain: string) {
    return `Key_${this.query.getKeyCountOfUser(ensDomain) + 1}`;
  }

  /** extract the Mnemonic from a wallet */
  extractMnemonic(wallet: EthersWallet) {
    const privateKey = wallet.privateKey;
    const mnemonic = entropyToMnemonic(privateKey);
    return mnemonic;
  }
}
