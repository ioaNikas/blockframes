import { Injectable } from '@angular/core';
import { Wallet, WalletService, WalletQuery } from "../+state";
import { Router, UrlTree, CanActivate, CanDeactivate } from "@angular/router";
import { Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AuthQuery } from '@blockframes/auth';
import { KeyManagerQuery } from '../../key-manager/+state';

@Injectable({ providedIn: 'root' })
export class WalletKeyGuard implements CanActivate, CanDeactivate<Wallet> {

  constructor(
    private walletQuery: WalletQuery,
    private keyQuery: KeyManagerQuery,
    private router: Router,
  ) {}

  canActivate(): Promise<boolean | UrlTree> | UrlTree {
    return new Promise((res, rej) => {
      const { ensDomain } = this.walletQuery.getValue();
      const count = this.keyQuery.getKeyCountOfUser(ensDomain);
      count === 0
        ? res(this.router.parseUrl('layout/o/account/wallet/add'))
        : res(true);
    });
  }

  canDeactivate() {
    return true;
  }
}