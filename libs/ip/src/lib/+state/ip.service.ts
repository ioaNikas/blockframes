import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ID } from '@datorama/akita';
import { IpStore } from './ip.store';
import { Ip, createIp } from './ip.model';

@Injectable({ providedIn: 'root' })
export class IpService {
  private collection: AngularFirestoreCollection<Ip>;

  constructor(
    private store: IpStore,
    private firestore: AngularFirestore,
  ) {
    this.collection = this.firestore.collection('ip');
  }

  public async add(ip: Ip) {
    const id = this.firestore.createId();
    this.store.add(createIp({...ip, id}));
  }

  public update(id, ip: Partial<Ip>) {
    this.store.update(id, ip);
  }

  public remove(id: ID | ID[]) {
    this.store.remove(id);
  }
}
