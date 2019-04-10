import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthStore, User, createUser } from './auth.store';
import { switchMap, takeWhile, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private store: AuthStore,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  //////////
  // AUTH //
  //////////
  public async signin(mail: string, pwd: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(mail, pwd);
    this.subscribeOnUser();
  }

  public async signup(mail: string, pwd: string) {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(mail, pwd);
    await this.create(user.user);
    this.subscribeOnUser();
  }

  public async logout() {
    await this.afAuth.auth.signOut();
    this.store.update({ user: null });
  }

  //////////
  // USER //
  //////////
  /** Listen on user changes */
  public subscribeOnUser() {
    this.afAuth.authState.pipe(
      takeWhile(user => !!user),
      switchMap(({ uid }) => this.db.doc<User>(`users/${uid}`).valueChanges())
    ).subscribe(user => this.store.update({ user }))
  }

  /** Create a user based on firebase user */
  public create({ email, uid }: firebase.User) {
    const user = createUser({ email, uid })
    return this.db.doc<User>(`users/${uid}`).set(user);
  }

  /** Upate a user */
  public update(uid: string, user: Partial<User>) {
    return this.db.doc<User>(`users/${uid}`).update(user);
  }

  /** Delete the current User */
  public async delete() {
    const uid = this.afAuth.auth.currentUser.uid;

    await this.store.update({ user: null })

    // deletes firebase auth
    return this.afAuth.auth.currentUser.delete()
    .then(() => this._deleteSubCollections(uid))
    .then(() => this.db.doc<User>(`users/${uid}`).delete())
    .then(() => true);
  }

  /** Deletes user subCollections */
  private _deleteSubCollections (uid) {
    // @todo check if user is the only member of org (and the only ADMIN)
    // @todo remove uid from org.userIds
    return this._getUserSubcollectionItems(uid, 'orgRights')
    .then(org => org.map(o => this.db
      .doc<User>(`users/${uid}`)
      .collection('orgRights')
      .doc(o.id)
      .delete()
    ));
  }

  /** Returns promise of subcollection[] */
  private _getUserSubcollectionItems(uid, collectionName) {
    return this.db.doc<User>(`users/${uid}`).collection(collectionName)
      .get()
      .toPromise()
      .then(items => items.docs);
  }
}
