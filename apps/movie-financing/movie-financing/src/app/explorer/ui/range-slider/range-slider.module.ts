import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FinancingRangeSliderComponent } from './range-slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FinancingRangeSliderComponent
  ], 
  exports: [
    FinancingRangeSliderComponent
  ],
  entryComponents: [
    FinancingRangeSliderComponent
  ]
})
export class FinancingRangeSliderModule {}