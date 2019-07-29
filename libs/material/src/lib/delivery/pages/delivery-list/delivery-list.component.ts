import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'libs/movie/src/lib/movie/+state/movie.model';
import { MovieQuery } from 'libs/movie/src/lib/movie/+state/movie.query';
import { DeliveryService, DeliveryQuery, Delivery } from '../../+state';
import { Router } from '@angular/router';
import { getBaseUrl } from '@blockframes/utils';

@Component({
  selector: 'delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryListComponent implements OnInit {
  public movie$: Observable<Movie>;
  public deliveries$: Observable<Delivery[]>;

  constructor(
    private movieQuery: MovieQuery,
    private service: DeliveryService,
    private router: Router,
    private query: DeliveryQuery
  ) {}

  ngOnInit() {
    this.movie$ = this.movieQuery.selectActive();
    this.deliveries$ = this.query.selectAll();
  }

  public async selectDelivery(delivery: Delivery) {
    // TODO: Figure out why router doesn't work with relative path:
    // this.router.navigate([`../${movie.id}/edit`], {relativeTo: this.route}) => ISSUE#696
    const validated = await this.service.isDeliveryValidated(delivery.id);
    validated
      ? this.router.navigate([`${getBaseUrl(this.router)}/${delivery.id}/view`])
      : this.router.navigate([`${getBaseUrl(this.router)}/${delivery.id}/edit`]);
  }
}
