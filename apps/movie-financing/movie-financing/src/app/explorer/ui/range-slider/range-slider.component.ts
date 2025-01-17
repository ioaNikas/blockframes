import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'financing-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancingRangeSliderComponent implements OnInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value: number;
  @Input() placeholder: string;
  @Input() unit: string;
  @Output() rangeValue = new EventEmitter(); 
  constructor() {}
  ngOnInit() {
    if (!this.value) this.value = this.min;
  }
  handleChange(target) {
    this.value = parseFloat(target.value);
    this.rangeValue.emit(this.value);
  }
}