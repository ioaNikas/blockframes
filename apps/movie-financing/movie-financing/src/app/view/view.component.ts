import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieQuery } from '@blockframes/movie';


@Component({
  selector: 'movie-financing-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {

  movie$: Observable<Movie>;

  constructor(
    private query: MovieQuery,
  ) { }

  ngOnInit() {
    this.movie$ = this.query.selectActive();
  }
}
