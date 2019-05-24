import { Injectable } from '@angular/core';
import { KeyManagerStore, createKey } from './key-manager.store';
import { utils, Wallet } from 'ethers';

@Injectable({ providedIn: 'root' })
export class KeyManagerService {

  private signingKey: utils.SigningKey;

  constructor(
    private store: KeyManagerStore
  ) {}

  /** Set signing key into process memory */
  private _setSigningKey(wallet: Wallet) {
    this.signingKey = new utils.SigningKey(wallet.privateKey);
  }

  private _requireSigningKey() {
    if (!this.signingKey) {
      throw new Error('A signing key is required ! If you are a Cascade8 dev, ask PL'); // TODO change error in prod
    }
  }

  // create / encrypt / store / from random
  createFromRandom(ensDomain: string, encryptionPassword: string) {
    const wallet = Wallet.createRandom();
    this._setSigningKey(wallet);
    this.store.setLoading(true);
    wallet.encrypt(encryptionPassword).then(keyStore => {
      console.log(`keystore ${keyStore} stored !`);
      this.store.add(createKey({ensDomain, keyStore}));
    });
  }
  // TODO create / encrypt / store / from mnemonic
  // TODO create / encrypt / store / from private key
  // TODO load key (retreive / decrypt, set into process memory)
  // TODO delete key
  // TODO get pub key (address)
  // TODO get priv key (for export)
  // TODO get mnemonic (for export)

}
