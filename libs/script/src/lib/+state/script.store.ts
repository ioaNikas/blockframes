import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Script } from './script.model';

export interface ScriptState extends EntityState<Script> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'script', idKey: 'hash' })
export class ScriptStore extends EntityStore<ScriptState, Script> {
  constructor() {
    super();
  }
}
