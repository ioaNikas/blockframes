import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { WalletStore, Wallet } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletQuery extends Query<Wallet> {
  constructor(protected store: WalletStore) {
    super(store);
  }
}