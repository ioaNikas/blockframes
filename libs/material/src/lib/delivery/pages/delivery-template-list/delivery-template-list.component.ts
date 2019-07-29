import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Template, TemplateQuery } from '../../../template/+state';
import { DeliveryService } from '../../+state';
import { MovieQuery } from '@blockframes/movie';
import { Router } from '@angular/router';
import { getBaseUrl } from '@blockframes/routes';

@Component({
  selector: 'material-delivery-template-list',
  templateUrl: './delivery-template-list.component.html',
  styleUrls: ['./delivery-template-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryTemplateListComponent implements OnInit {

  public movieId = this.movieQuery.getActiveId();
  public templates$: Observable<Template[]>;

  constructor(
    private deliveryService: DeliveryService,
    private movieQuery: MovieQuery,
    private query: TemplateQuery,
    private router: Router
  ) {}

  ngOnInit() {
    this.templates$ = this.query.selectAll();
  }

  public async createDelivery(templateId?: string) {

    const deliveryId = await this.deliveryService.addDelivery(templateId);
    this.router.navigate([`${getBaseUrl(this.router)}/${deliveryId}/settings`]);
  }

  public async useMovieAsTemplate() {
    const deliveryId = await this.deliveryService.addDeliveryWithMovieMaterials();
    this.router.navigate([`${getBaseUrl(this.router)}/${deliveryId}/settings`]);
  }

}
