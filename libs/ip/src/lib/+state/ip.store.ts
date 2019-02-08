import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Ip, createIp } from './ip.model';

export interface IpState extends EntityState<Ip> {
  form: Ip;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ip', idKey: 'id' })
export class IpStore extends EntityStore<IpState, Ip> {
  constructor() {
    super({form: createIp()});
  }
}
