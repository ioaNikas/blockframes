import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  get isLogged$() {
    return this.select(state => state.user).pipe(map(user => !!user));
  }

  get user() {
    return this.getSnapshot().user;
  }
}
