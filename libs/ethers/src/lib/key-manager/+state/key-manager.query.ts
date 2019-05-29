import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { KeyManagerStore, Key, KeyState } from './key-manager.store';
import { map, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeyManagerQuery extends QueryEntity<KeyState, Key> {
  constructor(protected store: KeyManagerStore) {
    super(store);
  }

  /**
   * Return an Observable of all keys stored for the logged user,
   * **except for the active key !**
   * @param ensDomain the ENS domain name of the logged user (ex: `bob.blockframes.eth`)
   */
  getAllKeysOfUser$(ensDomain: string) {
    return this.selectAll().pipe(
      map(keys => keys.filter(key => key.ensDomain === ensDomain)),
    );
  }
}
