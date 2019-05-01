import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateListGuard, FireQuery, Query } from '@blockframes/utils';
import { OrganizationQuery } from '@blockframes/organization';
import { MovieStore, Movie } from '../+state';
import { switchMap, map, tap } from 'rxjs/operators';

const movieQuery = (id: string): Query<Movie> => ({
  path: `movies/${id}`
});

@Injectable({ providedIn: 'root' })
export class MovieListGuard extends StateListGuard<Movie> {
  urlFallback = 'layout'

  constructor(
    private orgQuery: OrganizationQuery,
    private fireQuery: FireQuery,
    store: MovieStore,
    router: Router
  ) {
    super(store, router)
  }

  get query() {
    return this.orgQuery.selectMovieIds.pipe(
      map(ids => ids.map(id => movieQuery(id))),
      switchMap(query => this.fireQuery.fromQuery(query)),
    );
  }
}
