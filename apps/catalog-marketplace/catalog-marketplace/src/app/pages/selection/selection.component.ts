import { MovieQuery } from 'libs/movie/src/lib/movie/+state/movie.query';
import { MovieData } from './../../distribution-right/+state/basket.model';
import { Component, OnInit } from '@angular/core';
import { OrganizationQuery } from '@blockframes/organization';
import { staticModels } from '@blockframes/movie';
import { FormControl } from '@angular/forms';
import { BasketService } from '../../distribution-right/+state/basket.service';

@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class CatalogSelectionComponent implements OnInit {
  public movieDistributionRights: MovieData[];
  public priceControl: FormControl = new FormControl(null);
  public currencyList: string[];

  constructor(
    private orgQuery: OrganizationQuery,
    private basketService: BasketService,
    private movieQuery: MovieQuery
  ) {}
  ngOnInit() {
    this.currencyList = staticModels['MOVIE_CURRENCIES'].map(key => key.label);
    this.movieDistributionRights = this.orgQuery
      .getValue()
      .org.catalog.rights.map(right => this.createRightDetail({ right }));
      console.log(this.movieDistributionRights);
  }

  private createRightDetail(detail) {
    return {
      id: detail.right.id,
      movieName: this.getMovieTitle(detail.right.id),
      territory: detail.right.territories[0],
      rights: detail.right.medias[0],
      endRights: (detail.right.duration as any).to.toDate().toDateString(),
      languages: detail.right.languages[0],
      dubbed: detail.right.dubbings[0],
      subtitle: detail.right.subtitles[0]
    } as MovieData;
  }

  private getMovieTitle(id: string): string {
    let movieTitle: string;
    this.movieQuery.getAll().map(movie => {
      if (movie.id === id) {
        movieTitle = movie.main.title.international;
      }
    });
    console.log(movieTitle);
    return movieTitle;
  }

  public resetMovieDistribution(movieId: string) {}

  public setPriceCurrency(price) {
    //TODO update price and currency
    console.log(this.priceControl.value);
    this.basketService.addBid(price);
  }

  public selectionChange(movieData: MovieData[]) {}
}
