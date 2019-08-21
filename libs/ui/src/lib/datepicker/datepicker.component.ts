import { Component, Input, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDatepicker} from '@angular/material';

import { FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CalendarRange, isBetween } from '@blockframes/utils';

@Component({
  selector: 'datepicker-range',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  
  @Input() selectedRange: CalendarRange;
  @Input() disabledDates: CalendarRange[];

  @Output() wantedRange = new EventEmitter<CalendarRange>();
  
  @ViewChild('picker', {static: false}) picker: MatDatepicker<Date>;

  datepickerRange: CalendarRange = {
    begin: new Date(),
    end: new Date(),
  };
  
  isValidRange= false;
  range = new FormControl('', [Validators.required]);


  constructor(private _snackBar: MatSnackBar) {}
    
  public addRange(){
    this.wantedRange.emit(this.datepickerRange);
  }

  initDatePicker(){
    this.picker.open();
  }    

  disableDates = (date: Date): boolean => {
    return !this.disabledDates.some(range => isBetween(date, range.begin, range.end));
  }

  datepickerRangeChange(range: CalendarRange) {
    if(range){
      if(range.end < range.begin){
        this.datepickerRange = {
          begin: range.end,
          end: range.begin
        }
      }
      else{
      this.datepickerRange = range;
      }
      this.validateDatepickerInput(this.datepickerRange);
    }
  }

  validateDatepickerInput(datepickerRange: CalendarRange){
    const isInvalid = (disabledDate: CalendarRange) => {
      return isBetween(disabledDate.begin, datepickerRange.begin, datepickerRange.end) || 
      isBetween(disabledDate.end, datepickerRange.begin, datepickerRange.end);    
    }
    this.isValidRange = !this.disabledDates.some(disabledDate => isInvalid(disabledDate));
    if (!this.isValidRange){
      this.openSnackBar();
    }
    return this.isValidRange;
  }

  openSnackBar(){
    let snackBarRef = this._snackBar.open("Your selection contain a reserved date range.", "Change it", {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(()=> this.initDatePicker());
  }

  getErrorMessage() {
    return this.range.hasError('required') ? 'You must enter correct dates' : '';
  }  
}