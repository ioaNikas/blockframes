import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ScriptStore } from './script.store';
import { Script } from './script.model';

@Injectable({ providedIn: 'root' })
export class ScriptService {
  constructor(private store: ScriptStore) {}

  public add(script: Script) {
    this.store.add(script);
  }

  public update(id, script: Partial<Script>) {
    this.store.update(id, script);
  }

  public remove(id: ID) {
    this.store.remove(id);
  }
}
