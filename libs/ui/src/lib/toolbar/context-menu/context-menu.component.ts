import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContextMenuQuery} from '../+state/context-menu.query'
import { Router } from '@angular/router';
import { MenuItem } from '../+state';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit {
  public items: Array<MenuItem>;

  constructor(
    private query: ContextMenuQuery,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.query.menu$.subscribe(menu => {
      this.items = menu.items;
      this.ref.markForCheck();
    });
  }

  isActive(instruction: any[], exact: boolean): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), exact);
  }

}
