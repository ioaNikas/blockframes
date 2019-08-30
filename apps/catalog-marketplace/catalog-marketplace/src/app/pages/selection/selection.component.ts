import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class CatalogSelectionComponent implements OnInit {
  public distributionRights;
  constructor() {}
  ngOnInit() {
    // TODO #855: add guard to fetch distributionRights
  }
}
