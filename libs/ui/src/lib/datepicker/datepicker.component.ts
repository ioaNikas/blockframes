import { Component, Input, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDatepicker} from '@angular/material';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isBetween } from '@blockframes/utils';
import { DateRange } from 'libs/movie/src/lib/movie/+state/movie.model';
import { SatDatepickerRangeValue } from 'saturn-datepicker';

@Component({
  selector: 'datepicker-range',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerRangeComponent {
  
  @Input() selectedRange: DateRange;
  @Input() disabledDates: DateRange[];

  @Output() wantedRange = new EventEmitter<DateRange>();
  
  @ViewChild('picker', {static: false}) picker: MatDatepicker<Date>;

  range: DateRange = {
    from: new Date(),
    to: new Date(),
  };
  
  isValidRange= false;
  rangeForm = new FormControl('', [Validators.required]);


  constructor(private _snackBar: MatSnackBar) {}
    
  public addRange(){
    this.wantedRange.emit(this.range);
  }

  initDatePicker(){
    this.picker.open();
  }    

  disableDates = (date: Date): boolean => {
    return !this.disabledDates.some(range => isBetween(date, range.from, range.to));
  }

  rangeChange(range: SatDatepickerRangeValue<Date>) {
    if (range) {
      this.range = (range.end < range.begin) ? { from: range.end, to: range.begin } : {from: range.begin, to: range.end };
      this.validateDatepickerInput(this.range);
    }
  }

  validateDatepickerInput(range: DateRange){
    const isInvalid = (disabledDate: DateRange) => {
      return isBetween(disabledDate.from, range.from, range.to) || 
      isBetween(disabledDate.to, range.from, range.to);    
    }
    this.isValidRange = !this.disabledDates.some(disabledDate => isInvalid(disabledDate));
    
    if (!this.isValidRange){
      this.openSnackBar();
    }
    return this.isValidRange;
  }

  openSnackBar(){
    const snackBarRef = this._snackBar.open("Your selection contain a reserved date range.", "Change it", {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(()=> this.initDatePicker());
  }

  getErrorMessage() {
    return this.rangeForm.hasError('required') ? 'You must enter correct dates' : '';
  }  
}