import { NgModule } from '@angular/core';
import {
    MatDatepickerModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule, 
    MatCardModule, 
  } from "@angular/material";
import { CommonModule } from '@angular/common';
import { DatepickerRangeComponent } from './datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';


@NgModule({
  declarations: [DatepickerRangeComponent],
  imports: [ 
    MatIconModule,
    CommonModule,
    MatButtonModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule, 
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
],
  exports: [DatepickerRangeComponent]
})
export class DatepickerModule {}
