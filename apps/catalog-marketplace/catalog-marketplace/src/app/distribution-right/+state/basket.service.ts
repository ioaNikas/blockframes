import { Organization } from '@blockframes/organization';
import { FireQuery } from '@blockframes/utils';
import { Injectable } from '@angular/core';
import { CatalogBasket } from './basket.model';
import { OrganizationQuery } from '@blockframes/organization';

@Injectable({ providedIn: 'root' })
export class BasketService {
  constructor(private db: FireQuery, private organizationQuery: OrganizationQuery) {}

  public add(basket: CatalogBasket) {
    const organizationId = this.organizationQuery.getValue().org.id;
    this.db.doc<Organization>(`orgs/${organizationId}`).update( { catalog:  basket } )
  }
}
