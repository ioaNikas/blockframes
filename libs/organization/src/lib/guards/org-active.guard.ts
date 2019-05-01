import { Injectable } from '@angular/core';
import { StateActiveGuard, FireQuery } from '@blockframes/utils';
import { Organization, OrganizationStore } from '../+state';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class OrgActiveGuard extends StateActiveGuard<Organization> {
  readonly urlFallback = 'layout';
  readonly params = ['orgId'];

  constructor(
    private fireQuery: FireQuery,
    store: OrganizationStore,
    router: Router,
  ) {
    super(store, router);
  }

  query({ orgId }) {
    return this.fireQuery.fromQuery<Organization>(`orgs/${orgId}`);
  }
}
