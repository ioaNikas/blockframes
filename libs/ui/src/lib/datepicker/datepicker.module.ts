import { NgModule } from '@angular/core';
import {
    //MatNativeDateModule, 
    MatDatepickerModule, MatIconModule, MatButtonModule, MatInputModule, MatCardModule, 
  } from "@angular/material";
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';

/**
 * A list of action to pick,
 * Used to ask the user to choose a template.
 */
@NgModule({
  declarations: [DatepickerComponent],
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
  exports: [DatepickerComponent]
})
export class DatepickerModule {}
