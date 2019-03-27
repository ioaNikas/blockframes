import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from '../+state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private query: AuthQuery, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.query.isLogged$.pipe(
      map((isLogged) => {
        const fallbackUrl = route.data.fallback !== '' &&  route.data.fallback !== undefined ? route.data.fallback : '/auth/login';
        return isLogged ? isLogged : this.router.parseUrl(fallbackUrl);
      })
    );
  }
}
