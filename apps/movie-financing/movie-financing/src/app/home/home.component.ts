import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MovieQuery, Movie, MovieService } from '@blockframes/movie';
import { Observable } from 'rxjs';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'movie-financing-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  movies$: Observable<Movie[]>;

  constructor(
    private movieQuery: MovieQuery,
    private movieService: MovieService
  ) {
    this.movieService.fetch();
    this.movies$ = this.movieQuery.selectAll();
  }

  ngOnInit() {}
}

