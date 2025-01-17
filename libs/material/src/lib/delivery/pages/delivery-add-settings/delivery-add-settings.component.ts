import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ActionPickerListItem } from '@blockframes/ui';
import { DeliveryOption, DeliveryQuery, DeliveryService, DeliveryStore } from '../../+state';
import { TemplateQuery } from '../../../template/+state';
import { Router } from '@angular/router';
import { MovieQuery } from '@blockframes/movie';

/**
 * Page for the flow: "create a delivery"
 * final step, select its mode.
 */
@Component({
  selector: 'delivery-add-settings',
  templateUrl: './delivery-add-settings.component.html',
  styleUrls: ['./delivery-add-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryAddSettingsComponent {
  @HostBinding('attr.page-id') pageId = 'delivery-settings';

  public items: ActionPickerListItem<DeliveryOption>[] = [
    {
      title: 'Materials price list',
      payload: DeliveryOption.mustChargeMaterials
    },
    {
      title: 'Signature of the delivery',
      payload: DeliveryOption.mustBeSigned
    }
  ];
  public options: DeliveryOption[] = [];

  constructor(
    private service: DeliveryService,
    private query: DeliveryQuery,
    private templateQuery: TemplateQuery,
    private movieQuery: MovieQuery,
    private router: Router,
    private store: DeliveryStore
  ) {}

  public picked(options: DeliveryOption[]) {
    this.store.updateWizard({ options });
    this.options = options;
  }
  //TODO: remove dead code from delivery-add-complete
  public async onCompleteFlow() {
    const { wizard } = this.query;
    const movieId = this.movieQuery.getActiveId();
    const templateId = this.templateQuery.getActiveId();
    const deliveryId = await this.service.addDeliveryFromWizard(wizard, movieId, templateId);
    this.store.setActive(deliveryId);
    return this.router.navigate([`/layout/o/delivery/${movieId}/${deliveryId}/list`]);
  }
}
