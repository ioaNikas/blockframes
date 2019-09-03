import { MovieData, DistributionRight } from './../../distribution-right/+state/basket.model';
import { Component, OnInit } from '@angular/core';
import { BasketQuery } from '../../distribution-right/+state/basket.query';
import { FireQuery } from '@blockframes/utils';
import { OrganizationQuery } from '@blockframes/organization';
import { Observable } from 'rxjs';
import { MovieQuery } from '@blockframes/movie';

@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class CatalogSelectionComponent implements OnInit {
  public distributionRights;
  public movieDetails: MovieData[];
  public movieID;
  public movieList;
  public mock = [
    {
      id: 'test',
      // movieName: this.query.getActive().main.title.original,
      territory: 'test',
      rights: 'test',
      endRights: 'test',
      languages: 'test',
      dubbed: 'test',
      subtitle: 'test'
    },
    {
      id: 'test2',
      // movieName: this.query.getActive().main.title.original,
      territory: 'test',
      rights: 'test',
      endRights: 'test',
      languages: 'test',
      dubbed: 'test',
      subtitle: 'test'
    },
    {
      id: 'test3',
      // movieName: this.query.getActive().main.title.original,
      territory: 'test',
      rights: 'test',
      endRights: 'test',
      languages: 'test',
      dubbed: 'test',
      subtitle: 'test'
    }
  ]
  constructor(private query: BasketQuery, private fireQuery: FireQuery, private orgQuery: OrganizationQuery) {}
 ngOnInit() {
  this.distributionRights = this.orgQuery.getValue().org.catalog;
  console.log(this.distributionRights[0].rights);
  // console.log('price ', this.distributionRights[0].price);
  // console.log('rights ', this.distributionRights[0].rights);
  // console.log('id ', this.distributionRights[0].rights[0].movieId)
  this.movieID = this.distributionRights[0].rights[0].movieId;
  this.fireQuery.fromQuery(`movies/${this.movieID}`).subscribe(console.log)
  // console.log('match movie title ', this.fireQuery.fromQuery(`movies/${this.movieID}`));
  // this.movieDetails = this.distributionRights[0].rights.map(movie => this.createMovieDetails(movie));
  this.movieDetails = this.createMovieDetails(this.distributionRights[0].rights[0]);
  }

  public createMovieDetails(movieDetails) {
    return [
      {
        id: movieDetails.id,
        // movieName: this.query.getActive().main.title.orig?inal,
        territory: movieDetails.territories[0],
        rights: movieDetails.medias[0],
        endRights: movieDetails.duration.to,
        languages: movieDetails.languages[0],
        dubbed: movieDetails.dubbings[0],
        subtitle: movieDetails.subtitles[0]
      } as MovieData
    ];
  }

  public resetMovieDistribution(movieId: string) {

  }

  public selectionChange(movieData: MovieData[]) {

  }
}
