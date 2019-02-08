import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Ip, IpStore, IpQuery } from '../+state';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IpResolver implements Resolve<Ip> {

  constructor(private store: IpStore, private query: IpQuery) {}

  resolve(route: ActivatedRouteSnapshot): Ip {
    this.store.setActive(route.params['id']);
    return this.query.getActive() as Ip;
  }
}
