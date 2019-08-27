import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { DistributionRights, Price, BasketStatus } from './basket.model';

export interface BasketState extends EntityState<DistributionRights> {
  price: Price;
  status: BasketStatus;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'basket' })
export class BasketStore extends EntityStore<BasketState, DistributionRights> {

  constructor() {
    super();
  }

}
