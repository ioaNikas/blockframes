import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Delivery } from '../+state/delivery.model';
import { Observable } from 'rxjs';
import { DeliveryQuery } from '../+state';

@Component({
  selector: 'delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryItemComponent implements OnInit {

  @Input() delivery: Delivery;
  @Output() isSelected = new EventEmitter<boolean>();

  public progression$: Observable<number>;

  // Visual bullshit for WoW effect
  public stateIcons = ['dummy', 'alarm', 'check_circle_outline', 'play_circle_outline', 'thumb_up'];
  public paymentColors = ['dummy', 'green', 'red'];
  public stateIconsColors = ['dummy', 'teal', 'orange', 'grey', 'green'];

  constructor(private query: DeliveryQuery) { }

  ngOnInit() {
    this.progression$ = this.query.deliveryProgressionById(this.delivery.id);
  }

  public selectDelivery() {
    this.isSelected.emit(true);
  }

  public getRandomColor() {
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
  }

  public randomNumberPicker(scale: number) {
    return Math.floor(Math.random() * scale) + 1;
  }
}

