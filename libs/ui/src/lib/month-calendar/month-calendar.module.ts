import { NgModule } from '@angular/core';
import { 
    MatGridListModule, MatIconModule, MatButtonModule, 
  } from "@angular/material";
import { CalendarComponent } from './month-calendar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    MatGridListModule, 
    MatIconModule,
    CommonModule,
    MatButtonModule
],
  exports: [CalendarComponent]
})
export class MonthCalendarModule {}
