import { Organization } from '@blockframes/organization';
import { FireQuery } from '@blockframes/utils';
import { Injectable } from '@angular/core';
import { DistributionRight, BasketStatus, Price, CatalogBasket } from './basket.model';
import { OrganizationQuery } from '@blockframes/organization';

@Injectable({ providedIn: 'root' })
export class BasketService {
  private organization: Organization;
  constructor(private db: FireQuery, private organizationQuery: OrganizationQuery) {
    this.organization = this.organizationQuery.getValue().org;
  }

  public add(distributionRight: DistributionRight) {
    const newDistributionRight = [...this.organization.catalog.rights, distributionRight];
    // check if the default value has already been set
    if (this.organization.catalog.price.amount > 0) {
      this.db.doc<Organization>(`orgs/${this.organization.id}/`).update({
        catalog: {
          price: {
            amount: this.organization.catalog.price.amount,
            currency: this.organization.catalog.price.currency
          },
          status: BasketStatus.pending,
          rights: newDistributionRight
        }
      });
    } else {
      this.db.doc<Organization>(`orgs/${this.organization.id}/`).update({
        catalog: {
          price: { amount: 0, currency: 'us-dollar' },
          status: BasketStatus.pending,
          rights: newDistributionRight
        }
      });
    }
  }

  public addBid(price: Price) {
    const updatedCatalog: CatalogBasket = {
      price: { amount: price.amount, currency: price.currency },
      status: this.organization.catalog.status,
      rights: this.organization.catalog.rights
    };
    this.db.doc<Organization>(`orgs/${this.organization.id}/`).update({ catalog: updatedCatalog });
  }

  public removeRight(id: string) {
    const updatedCatalog: CatalogBasket = {
      price: this.organization.catalog.price,
      status: this.organization.catalog.status,
      rights: this.organization.catalog.rights.filter(right => right.id !== id)
    };
    this.db.doc<Organization>(`orgs/${this.organization.id}/`).update({ catalog: updatedCatalog });
  }
}
