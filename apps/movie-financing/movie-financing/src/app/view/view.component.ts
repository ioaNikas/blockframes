import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieQuery, MovieStore } from '@blockframes/movie';


@Component({
  selector: 'movie-financing-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {

  movie$: Observable<Movie>;

  constructor(
    private query: MovieQuery,
    private store: MovieStore,
  ) { }

  ngOnInit() {
    this.movie$ = this.query.selectActive();
  }

  ngOnDestroy() {
    this.store.setActive(null);
  }
}
