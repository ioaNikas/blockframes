import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryService } from '@blockframes/delivery';
import { Location } from '@angular/common';

@Component({
  selector: 'delivery-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {
  public materials$: Observable<Object>;
  public progressionValue$: Observable<number>;

  constructor(private deliveryService: DeliveryService, private location: Location) {}

  ngOnInit() {
    this.materials$ = this.deliveryService.getSortedDeliveryMaterials();
    this.progressionValue$ = this.deliveryService.getDeliveryProgression();
  }

  public goBack() {
    this.location.back();
  }
}
