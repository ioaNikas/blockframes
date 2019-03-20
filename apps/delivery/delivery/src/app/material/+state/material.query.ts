import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Material } from './material.model';
import { MaterialStore, State } from './material.store';

@Injectable({
  providedIn: 'root'
})
export class MaterialQuery extends QueryEntity<State, Material> {
  constructor(
    protected store: MaterialStore,
  ) {
    super(store);
  }

}
