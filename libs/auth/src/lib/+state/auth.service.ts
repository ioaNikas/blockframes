import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthStore, createUser } from './auth.store';
import { map, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: AuthStore, private afAuth: AngularFireAuth) {
    this.afAuth.authState
      .pipe(map(user => (user ? createUser(user) : null)))
      .subscribe(user => this.store.update({ user }));
  }

  public signin(mail: string, pwd: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, pwd);
  }

  public signup(mail: string, pwd: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(mail, pwd);
  }

  public logout() {
    return this.afAuth.auth.signOut();
  }
}
