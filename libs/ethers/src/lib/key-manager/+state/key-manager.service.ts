import { Injectable } from '@angular/core';
import { KeyManagerStore } from './key-manager.store';
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
      console.log(keyStore);
      this.store.set([{
        ensDomain,
        keyStore,
        keyName: 'default'
      }])
    });
  }
  // create / encrypt / store / from mnemonic
  // create / encrypt / store / from private key
  // load key (retreive / decrypt, set into process memory)
  // delete key
  // get pub key (address)
  // get priv key (for export)
  // get mnemonic (for export)

}
