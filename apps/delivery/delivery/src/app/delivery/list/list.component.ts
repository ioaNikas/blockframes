import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieQuery, Movie } from '@blockframes/movie';
import { DeliveryService, Delivery } from '@blockframes/delivery';
import { Location } from '@angular/common';

@Component({
  selector: 'delivery-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDectectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  public movie$: Observable<Movie>;
  public deliveries$: Observable<Delivery[]>

  constructor(
    private movieQuery: MovieQuery,
    private deliveryService: DeliveryService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.movie$ = this.movieQuery.selectActive();
    this.deliveries$ = this.deliveryService.deliveriesByActiveMovie$;
  }

  public goBack() {
    this.location.back();
  }

}
