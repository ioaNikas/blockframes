import { BasketQuery } from '../../distribution-right/+state/basket.query';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class CatalogSelectionComponent implements OnInit {
  public distributionRights;
  constructor(private basketQuery: BasketQuery) {}
  ngOnInit() {
    console.log(this.basketQuery.getAll())
  }
}
