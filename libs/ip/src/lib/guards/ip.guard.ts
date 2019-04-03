import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { IpQuery, IpStore } from '../+state';
import { IpResolver } from '@blockframes/ip';

@Injectable({
  providedIn: 'root'
})
export class IpGuard implements CanActivate {
  constructor(
    private query: IpQuery,
    private router: Router,
    private store: IpStore,
    private ipResolver: IpResolver,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const ip = this.ipResolver.resolve(route);

    if (ip !== undefined ) {
      this.store.setActive(ip.id);
      return true;
    } else {
      const fallbackUrl = route.data.fallback !== '' &&  route.data.fallback !== undefined ? route.data.fallback : '/layout/home';
      return this.router.parseUrl(fallbackUrl);
    }
  }
}
