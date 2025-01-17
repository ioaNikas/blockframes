import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Delivery, Currencies } from '../../+state';
import { Material } from '../../../material/+state';
import { FormEntity } from '@blockframes/utils';
import { MaterialControl } from '../../forms/material.form';

@Component({
  selector: '[formGroupName] delivery-material-form, [formGroup] delivery-material-form, delivery-material-form',
  templateUrl: './delivery-material-form.component.html',
  styleUrls: ['./delivery-material-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DeliveryMaterialFormComponent{
  @HostBinding('attr.page-id') pageId = 'delivery-material-form';
  @Input() delivery: Delivery;

  @Output() delete = new EventEmitter<Material>();
  @Output() enable = new EventEmitter<void>();
  @Output() disable = new EventEmitter<void>();

  public currencies = Currencies;

  constructor(public controlContainer: ControlContainer) {}

  public get control() {
    return this.controlContainer.control as FormEntity<MaterialControl>;
  }
}
