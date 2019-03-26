import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Template } from './template.model';

export interface TemplateState extends EntityState<Template>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'template', idKey: 'id' })
export class TemplateStore extends EntityStore<TemplateState, Template> {

  constructor() {
    super();
  }

}
