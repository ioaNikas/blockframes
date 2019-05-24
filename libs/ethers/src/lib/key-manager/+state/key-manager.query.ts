import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { KeyManagerStore, Key, KeyState } from './key-manager.store';

@Injectable({ providedIn: 'root' })
export class KeyManagerQuery extends QueryEntity<KeyState, Key> {
  constructor(protected store: KeyManagerStore) {
    super(store);
  }
}
