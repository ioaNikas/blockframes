import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateListGuard, FireQuery, Query } from '@blockframes/utils';
import { Movie, MovieStore } from '../+state';
import { OrganizationQuery } from '@blockframes/organization';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const movieQuery = (id: string): Query<Movie> => ({
  path: `movies/${id}`
});

@Injectable({ providedIn: 'root' })
export class MovieListGuard extends StateListGuard<Movie> {
  // TODO: Remove this temporary code when everyone switch to main application architecture
  public get urlFallback() {
    const routerCurrentNavigation = this.router.getCurrentNavigation();

    if (!!routerCurrentNavigation.extractedUrl.root.children.primary) {
      const appName = routerCurrentNavigation.extractedUrl.root.children.primary.segments[2].path;
      return `/layout/o/${appName}/movie/create`;
    } else {
      const appName = routerCurrentNavigation.finalUrl.root.children.primary.segments[2].path;
      return `/layout/o/${appName}/create`;
    }
  }

  constructor(
    private fireQuery: FireQuery,
    private organizationQuery: OrganizationQuery,
    store: MovieStore,
    router: Router
  ) {
    super(store, router);
  }

  get query() {
    return this.organizationQuery
      .select(state => state.org.movieIds)
      .pipe(
        switchMap(ids => {
          if (!ids || ids.length === 0) throw new Error('No movie yet');
          const queries = ids.map(id => this.fireQuery.fromQuery<Movie>(movieQuery(id)));
          return combineLatest(queries);
        })
      );
  }
}
