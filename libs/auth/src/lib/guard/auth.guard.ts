import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from '../+state';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private query: AuthQuery, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.query.select(state => state.user).pipe(
      map(user => !!user),
      tap(isLogged => (isLogged ? isLogged : this.router.navigate([''])))
    );
  }
}
