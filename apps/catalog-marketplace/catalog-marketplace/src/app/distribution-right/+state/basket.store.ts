import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { DistributionRight, Price, BasketStatus } from './basket.model';

export interface BasketState extends EntityState<DistributionRight> {
  price: Price;
  status: BasketStatus;
  right: DistributionRight;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'basket', idKey: 'id' })
export class BasketStore extends EntityStore<BasketState, any> {

  constructor() {
    super();
  }

}
