import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Query, StateActiveGuard, FireQuery } from '@blockframes/utils';
import { OrganizationStore, Organization } from '@blockframes/organization';

export const catalogDistributionRights = (id: string): Query<Organization> => ({
  path: `org/${id}/distributionRights/`
});

@Injectable({ providedIn: 'root' })
export class CatalogDistributionRightsGuard extends StateActiveGuard<Organization> {
  readonly params = ['orgId'];
  readonly urlFallback: 'layout/o/catalog';

  constructor(private fireQuery: FireQuery, store: OrganizationStore, router: Router) {
    super(store, router);
  }

  query({ orgId }) {
    const query = catalogDistributionRights(orgId);
    return this.fireQuery.fromQuery<Organization>(query);
  }
}
