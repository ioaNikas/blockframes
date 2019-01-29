import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ScriptStore, ScriptState } from './script.store';
import { Script } from './script.model';

@Injectable({
  providedIn: 'root'
})
export class ScriptQuery extends QueryEntity<ScriptState, Script> {

  constructor(protected store: ScriptStore) {
    super(store);
  }

}
