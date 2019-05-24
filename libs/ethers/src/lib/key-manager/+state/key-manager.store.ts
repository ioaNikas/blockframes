import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';

export interface Key {
  keyName: string
  ensDomain: string,
  keyStore: string,
}

export interface KeyState extends EntityState<Key> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'key' })
export class KeyManagerStore extends EntityStore<KeyState, Key> {
  constructor() {
    super();
  }
}
