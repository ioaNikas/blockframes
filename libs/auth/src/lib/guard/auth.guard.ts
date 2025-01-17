import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthQuery, AuthStore, User } from '../+state';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FireQuery } from '@blockframes/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private store: AuthStore,
    private query: AuthQuery,
    private db: FireQuery,
    private router: Router
  ) {}

  public subscription: Subscription;

  canActivate(): boolean | Promise<boolean | UrlTree> {
    this.store.update({ requestedRoute: null });
    // Connected on the app
    if (!!this.query.user) return true;
    // Wait for the server to give first answer
    return new Promise((res, rej) => {
      this.subscription = this.afAuth.authState
        .pipe(
          switchMap(userAuth => {
            if (!userAuth) throw new Error('Not connected');
            this.store.update({ auth: { emailVerified: userAuth.emailVerified } });
            return this.db.doc<User>(`users/${userAuth.uid}`).valueChanges();
          }),
          tap(user => this.store.update({ user })),
          map(user => (user && user.name && user.surname) ? true : this.router.parseUrl('auth/identity'))
        )
        .subscribe({
          next: (response: boolean | UrlTree) => res(response),
          error: error => res(this.router.parseUrl('auth/connexion'))
        });
    });
  }

  canDeactivate() {
    this.subscription.unsubscribe();
  }
}
