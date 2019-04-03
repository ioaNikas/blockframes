import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContextMenuQuery} from '../+state/context-menu.query'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit {
  public items$: Observable<any>;

  constructor(
    private query: ContextMenuQuery,
    private router: Router,
  ) {}

  ngOnInit() {
    this.items$ = this.query.menu$;
  }

  isActive(instruction: any[], exact: boolean): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), exact);
  }

}
