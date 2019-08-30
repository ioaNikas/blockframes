import { BasketStore } from './../distribution-right/+state/basket.store';
import { CatalogBasket } from '@blockframes/catalog-marketplace';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Query, StateActiveGuard, FireQuery } from '@blockframes/utils';

export const catalogMarketplaceBasket = (id: string): Query<CatalogBasket> => ({
  path: `org/${id}/catalog`
});

@Injectable({ providedIn: 'root' })
export class CatalogMarketBasketGuard extends StateActiveGuard<CatalogBasket> {
  readonly params = ['orgId'];
  readonly urlFallback: 'layout';

  constructor(private fireQuery: FireQuery, store: BasketStore, router: Router) {
    super(store, router);
  }

  query({ orgId }) {
    const query = catalogMarketplaceBasket(orgId);
    return this.fireQuery.fromQuery<CatalogBasket>(query);
  }
}
