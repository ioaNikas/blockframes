import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState, ID, guid, ActiveState } from '@datorama/akita';

export interface Key {
  ensDomain: string,
  keyStore: string,
  id: ID
}

export interface KeyState extends EntityState<Key>, ActiveState {}

export function createKey(key: Partial<Key>) {
  return { ...key, id: guid()} as Key;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'key' })
export class KeyManagerStore extends EntityStore<KeyState, Key> {
  constructor() {
    super();
    this.setLoading(false);
  }
}
