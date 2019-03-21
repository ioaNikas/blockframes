import { Component, OnInit } from '@angular/core';
import { Movie, MovieQuery } from '@blockframes/movie';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Material } from '../../material/+state';
import { DeliveryService } from '@blockframes/delivery';

@Component({
  selector: 'delivery-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewDeliveryComponent implements OnInit {

  public movie$ : Observable<Movie>;

  constructor(
    private movieQuery: MovieQuery,
    private location: Location,
    private deliveryService: DeliveryService,
    ) { }

  ngOnInit() {
    this.movie$ = this.movieQuery.selectActive();
  }

  public deliveredToggle(material: Material, movieId: string) {
    this.deliveryService
      .deliveredToggle(material, movieId)
      .catch(err => console.log(err));
  }

  public goBack() {
    this.location.back();
  }

}
