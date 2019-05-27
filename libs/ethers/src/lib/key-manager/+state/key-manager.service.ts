import { Injectable } from '@angular/core';
import { KeyManagerStore, createKey, Key } from './key-manager.store';
import { utils, Wallet as EthersWallet } from 'ethers';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class KeyManagerService {

  private signingKey: utils.SigningKey;

  constructor(
    private store: KeyManagerStore,
    private snackBar: MatSnackBar,
  ) {}

  /** Set signing key into process memory */
  private _setSigningKey(wallet: EthersWallet) {
    this.signingKey = new utils.SigningKey(wallet.privateKey);
  }

  private _requireSigningKey() {
    if (!this.signingKey) {
      throw new Error('A signing key is required ! If you are a Cascade8 dev, ask PL'); // TODO change error in prod
    }
  }

  // create / encrypt / store / from random
  createFromRandom(ensDomain: string, encryptionPassword: string) {
    this.store.setLoading(true);
    const wallet = EthersWallet.createRandom();
    this._setSigningKey(wallet);
    wallet.encrypt(encryptionPassword).then(keyStore => {
      const key = createKey({ensDomain, keyStore});
      this.store.add(key);
      this.store.setActive(key.id);
      this.store.setLoading(false);
    });
  }
  // TODO create / encrypt / store / from mnemonic
  // TODO create / encrypt / store / from private key

  // load key (retreive / decrypt, set into process memory)
  unlockAndSetActive(key: Key, encryptionPassword: string) {
    this.store.setLoading(true);
    EthersWallet.fromEncryptedJson(key.keyStore, encryptionPassword).then(wallet => {
      this._setSigningKey(wallet);
      this.store.setActive(key.id);
      this.store.setLoading(false);
    }).catch(error => {
      console.warn(error);
      this.snackBar.open('Invalid Password', 'close', { duration: 1000 });
      this.store.setLoading(false);
    });
  }
  // clean process memory
  lockActiveKey() {
    this.store.setActive(null);
    delete this.signingKey;
  }

  // delete key
  deleteKey(key: Key) {
    this.store.remove(key.id);
  }

  // TODO get pub key (address)
  // TODO get priv key (for export)
  // TODO get mnemonic (for export)

}
