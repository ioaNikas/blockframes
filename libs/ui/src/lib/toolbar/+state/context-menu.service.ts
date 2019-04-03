import { Injectable } from '@angular/core';
import { ContextMenuStore } from './context-menu.store';
import { ContextMenu } from './context-menu.model';

@Injectable({ providedIn: 'root' })
export class ContextMenuService {

  constructor(private store: ContextMenuStore) {}

  setMenu(menu: ContextMenu[]) {
    this.store.set(menu);
  }
}
