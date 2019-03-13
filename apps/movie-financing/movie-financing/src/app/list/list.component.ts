import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MovieQuery, Movie, MovieService } from '@blockframes/movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'movie-financing-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  movies$: Observable<Movie[]>;

  constructor(
    private query: MovieQuery,
    private service: MovieService
  )
  {
    this.service.fetch();
    this.movies$ = this.query.selectAll();
  }

  ngOnInit() {
  }

}
