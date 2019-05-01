import { Injectable } from '@angular/core';
import { StateActiveGuard, FireQuery } from '@blockframes/utils';
import { Movie, MovieStore } from '../+state';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MovieActiveGuard extends StateActiveGuard<Movie> {
  readonly params = ['movieId']
  readonly urlFallback: 'layout';

  constructor(private fireQuery: FireQuery, store: MovieStore, router: Router) {
    super(store, router);
  }

  query({ movieId }) {
    return this.fireQuery.fromQuery<Movie>(`movies/${movieId}`)
  }
}
