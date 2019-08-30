import { BasketStore } from './../distribution-right/+state/basket.store';
import { CatalogBasket } from '@blockframes/catalog-marketplace';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Query, StateActiveGuard, FireQuery } from '@blockframes/utils';
import { OrganizationQuery } from '@blockframes/organization';

export const catalogMarketplaceBasket = (id: string): Query<CatalogBasket> => ({
  path: `org/${id}/catalog`
});

@Injectable({ providedIn: 'root' })
export class CatalogMarketBasketGuard extends StateActiveGuard<CatalogBasket> {
  readonly params = ['orgId'];
  readonly urlFallback: 'layout';

  constructor(
    private fireQuery: FireQuery,
    store: BasketStore,
    router: Router,
    private organizationQuery: OrganizationQuery
  ) {
    super(store, router);
  }

  query({ params }) {
    const organizationId = this.organizationQuery.getValue().org.id;
    const query = catalogMarketplaceBasket(organizationId);
    return this.fireQuery.fromQuery<CatalogBasket>(query);
  }
}
