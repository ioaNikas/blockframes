import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface WalletState {
  address: string;
  privateKey: string;
  mnemonic: string;
}

export const initialState: WalletState = {
  address: null,
  privateKey: null,
  mnemonic: null
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wallet' })
export class WalletStore extends Store<WalletState> {

  constructor() {
    super(initialState);
  }

}

