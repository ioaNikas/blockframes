import { MovieData, DistributionRight } from './../../distribution-right/+state/basket.model';
import { Component, OnInit } from '@angular/core';
import { BasketQuery } from '../../distribution-right/+state/basket.query';
import { FireQuery } from '@blockframes/utils';
import { OrganizationQuery } from '@blockframes/organization';
import { Observable } from 'rxjs';
import { MovieQuery } from '@blockframes/movie';
import { FormControl } from '@angular/forms';
import { BasketService } from '../../distribution-right/+state/basket.service';

@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class CatalogSelectionComponent implements OnInit {
  public distributionRights;
  public rightDetail: MovieData[];
  public movieID;
  public priceControl: FormControl = new FormControl(null);
  public movieName: string;
  constructor(private basketQuery: BasketQuery, private db: FireQuery, private orgQuery: OrganizationQuery, private basketService: BasketService, private movie: MovieQuery) {}
 ngOnInit() {
  this.distributionRights = this.orgQuery.getValue().org.catalog;
  this.rightDetail = this.distributionRights.rights.map(right => this.CreateRightDetail({right}));
}

  public CreateRightDetail(detail) {
    return  {
        id: detail.right.id,
        // TODO: get movie name
        // movieName: this.movie.getAll().map(name=> name.id === detail.right.id),
        territory: detail.right.territories[0],
        rights: detail.right.medias[0],
        endRights: (detail.right.duration as any).to.toDate().toDateString() ,
        languages: detail.right.languages[0],
        dubbed: detail.right.dubbings[0],
        subtitle: detail.right.subtitles[0]
      } as MovieData;
  }

  public resetMovieDistribution(movieId: string) {

  }

  public setPrice(price) {
    console.log(this.priceControl.value);
    this.basketService.addBid(price);
  }

  public selectionChange(movieData: MovieData[]) {
  }
}
