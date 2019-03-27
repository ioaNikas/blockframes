import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { IpQuery, IpStore } from '../+state';

@Injectable({
  providedIn: 'root'
})
export class IpGuard implements CanActivate {
  constructor(
    private query: IpQuery,
    private router: Router,
    private store: IpStore,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const ipId = this.query.getEntity(route.params['id']);

    if (ipId !== undefined ) {
      // @todo check if actually exists in store
      // @todo use IpResolver (import { IpResolver } from '@blockframes/ip';)
      this.store.setActive(ipId); // @todo not working
      return true;
    } else {
      const fallbackUrl = route.data.fallback !== '' &&  route.data.fallback !== undefined ? route.data.fallback : '/layout/explorer';
      return this.router.parseUrl(fallbackUrl);
    }
  }
}
