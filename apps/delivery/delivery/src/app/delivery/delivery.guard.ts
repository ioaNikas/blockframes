import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { DeliveryStore } from '@blockframes/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryGuard implements CanActivate {

  constructor(private store: DeliveryStore) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.store.setActive(route.params.id);
    return true;
  }

}
