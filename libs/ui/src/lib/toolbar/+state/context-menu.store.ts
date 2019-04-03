import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { ContextMenu } from './context-menu.model';

export interface ContextMenuState extends EntityState<ContextMenu>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'context-menu', idKey: 'route' })
export class ContextMenuStore extends EntityStore<ContextMenuState, ContextMenu> {
  constructor() {
    super({});
  }

}
