import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContextMenuService } from '@blockframes/ui';
import { CONTEXT_MENU } from './context-menu';

@Component({
  selector: 'delivery-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LayoutComponent implements OnInit {

  constructor(
    private contextMenuService: ContextMenuService,
  ) {}

  ngOnInit() {
    this.contextMenuService.setMenu(CONTEXT_MENU);
  }
}
