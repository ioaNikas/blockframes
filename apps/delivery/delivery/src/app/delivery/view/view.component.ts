import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Material } from '../../material/+state';
import { Observable } from 'rxjs';
import { DeliveryService } from '@blockframes/delivery';

@Component({
  selector: 'delivery-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {

  public materials$: Observable<Material[]>;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.deliveryService.materialsByActiveDelivery().subscribe(x => console.log(x));
  }

}
