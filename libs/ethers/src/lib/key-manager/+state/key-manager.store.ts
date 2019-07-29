import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState, ActiveState } from '@datorama/akita';

export interface Key {
  name: string,
  ensDomain: string,
  keyStore: string,
  address: string,
  isMainKey: boolean,
  isLinked: boolean, // does the key also exists inside the ERC1077
}

export interface KeyState extends EntityState<Key>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'key', idKey: 'address' })
export class KeyManagerStore extends EntityStore<KeyState, Key> {
  constructor() {
    super();
    this.setLoading(false);
  }
}
