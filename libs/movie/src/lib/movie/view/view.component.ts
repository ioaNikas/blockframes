import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieQuery, MovieStore } from '../+state';
import { getLabelBySlug } from '../staticModels';

@Component({
  selector: 'movie-financing-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {
  @Input() form$: Observable<any>;
  @Input() mode: string;

  movie$: Observable<any>;

  constructor(
    private query: MovieQuery,
    private store: MovieStore,
  ) { }

  ngOnInit() {
    if (this.mode === 'preview'){
      this.movie$ = this.form$;
    } else {
      this.movie$ = this.query.selectActive();
    }
  }

  /* Returns label from json staticModels */
  public getStaticBySlug (scope: string, slug: string) {
    return getLabelBySlug (scope, slug) as string;
  }
  
  ngOnDestroy() {
    this.store.setActive(null);
  }
}
