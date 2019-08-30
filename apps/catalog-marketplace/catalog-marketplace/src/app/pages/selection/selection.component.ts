import { MovieData } from './../../distribution-right/+state/basket.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class CatalogSelectionComponent implements OnInit {
  public distributionRights;
  public movieDetails: MovieData;
  constructor() {}
  ngOnInit() {
    // TODO #855: add guard to fetch distributionRights
  }

  public resetMovieDistribution(movieId: string) {

  }

  public selectionChange(movieData: MovieData[]) {

  }
}
