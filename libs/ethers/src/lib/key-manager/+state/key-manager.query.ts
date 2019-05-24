import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { KeyManagerStore, Key, KeyState } from './key-manager.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class KeyManagerQuery extends QueryEntity<KeyState, Key> {
  constructor(protected store: KeyManagerStore) {
    super(store);
  }

  getAllKeysOfUser(ensDomain: string) {
    return this.selectAll().pipe(
      map(keys => keys.filter(key => key.ensDomain === ensDomain)),
    );
  }
}
