import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Movie, MovieStore } from '../+state';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieGuard implements CanActivate {

  constructor(private store: MovieStore) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.store.setActive(route.params.id);
    return true;
  }

}
