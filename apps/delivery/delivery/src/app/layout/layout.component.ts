import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Movie, MovieQuery } from '@blockframes/movie';
import { Observable } from 'rxjs';
import { ContextMenuService } from '@blockframes/ui';
import { CONTEXT_MENU } from './context-menu';

@Component({
  selector: 'delivery-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LayoutComponent implements OnInit {

  public movie$: Observable<Movie>;

  constructor(
    private movieQuery: MovieQuery,
    private contextMenuService: ContextMenuService
  ) {}

  ngOnInit() {
    this.contextMenuService.setMenu(CONTEXT_MENU);
    this.movie$ = this.movieQuery.selectActive();
  }
}
