import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: AuthStore, private afAuth: AngularFireAuth) {}

  public async login() {
    try {
      const cred = await this.afAuth.auth.signInAnonymously();
      const { uid, email } = cred.user;
      this.store.update({ user: { uid, email } });
    } catch (err) {
      throw err;
    }
  }

  public async logout() {
    this.afAuth.auth.signOut();
  }
}
