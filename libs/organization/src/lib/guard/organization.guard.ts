import { Injectable } from '@angular/core';
import { Organization, OrganizationService } from '../+state';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganizationStatus } from '@blockframes/models';

@Injectable({ providedIn: 'root' })
export class OrganizationGuard {
  private subscription: Subscription;

  constructor(private orgService: OrganizationService, private router: Router) {}

  canActivate() {
    return new Promise(res => {
      this.subscription = this.orgService.sync().subscribe({
        next: (organization: Organization) => {
          if (!organization) {
            return res(false);
          }
          if (organization.status === OrganizationStatus.pending) {
            return res(this.router.parseUrl('layout/organization/congratulation'));
          }
          this.orgService.retrieveDataAndAddListeners();
          return res(true);
        },
        error: err => {
          console.log('Error: ', err);
          res(this.router.parseUrl('layout/organization'));
        }
      });
    });
  }

  canDeactivate() {
    this.subscription.unsubscribe();
    this.orgService.removeAllListeners();
    return true;
  }
}
