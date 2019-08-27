import { FireQuery } from '@blockframes/utils';
import { Injectable } from '@angular/core';
import { DistributionRights } from './basket.model';
import { OrganizationQuery } from '@blockframes/organization';

@Injectable({ providedIn: 'root' })
export class BasketService {

  constructor(private db: FireQuery, private organizationQuery: OrganizationQuery) {}
<<<<<<< HEAD
  
  public add(distributionRight: DistributionRight){
    const organizationId = this.organizationQuery.getValue();
    this.db.doc<DistributionRight>(`orgs/${organizationId}/distributionRight`).set(distributionRight);
=======

  public add(distributionRight: DistributionRights){
    const organizationId = this.organizationQuery.getValue();
    this.db.doc<DistributionRights>(`orgs/${organizationId}/distributionRight`).set(distributionRight);
>>>>>>> added guard
  }

}
