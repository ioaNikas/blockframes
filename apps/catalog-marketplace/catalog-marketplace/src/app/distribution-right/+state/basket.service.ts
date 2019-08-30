import { FireQuery } from '@blockframes/utils';
import { Injectable } from '@angular/core';
import { CatalogBasket } from './basket.model';
import { OrganizationQuery } from '@blockframes/organization';

@Injectable({ providedIn: 'root' })
export class BasketService {
  constructor(private db: FireQuery, private organizationQuery: OrganizationQuery) {}

  public add(distributionRight: CatalogBasket) {
    const organizationId = this.organizationQuery.getValue().org.id;
    this.db
      .collection<CatalogBasket>(`orgs/${organizationId}/distributionRights`)
      .add(distributionRight);
  }
}
