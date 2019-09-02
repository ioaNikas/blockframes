import { MovieData } from './../../distribution-right/+state/basket.model';
import { Component, OnInit } from '@angular/core';
import { BasketQuery } from '../../distribution-right/+state/basket.query';

@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class CatalogSelectionComponent implements OnInit {
  public distributionRights;
  public movieDetails: MovieData;
  constructor(private query: BasketQuery) {}
  ngOnInit() {
    // TODO #855: add guard to fetch distributionRights
    console.log(this.query.getActive())
  }

  public resetMovieDistribution(movieId: string) {

  }

  public selectionChange(movieData: MovieData[]) {

  }
}
