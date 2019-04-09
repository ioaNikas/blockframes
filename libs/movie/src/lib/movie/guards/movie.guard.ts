import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { MovieStore, MovieQuery } from '../+state';

@Injectable({
  providedIn: 'root'
})
export class MovieGuard implements CanActivate {

  constructor(private store: MovieStore, private query: MovieQuery, private router: Router,) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (!!this.query.getEntity(route.params.movieId)) {
      this.store.setActive(route.params.movieId);
      return true;
    } else {
      const redirectTo: UrlTree = this.router.parseUrl('/not-found');
      return redirectTo;
    }
  }
}
