import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input} from '@angular/core';
import { isBetween } from '@blockframes/utils';
import { DateRange } from 'libs/movie/src/lib/movie/+state/movie.model';

interface Tile {
  cols: number;
  rows: number;
  date: Date;
  state?: 'empty' | 'partial' | 'full';
}

@Component({
  selector: 'month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

  @Input() selectedRange: DateRange;
  @Input() disabledDates: DateRange[];
  @Output() rangeSelected = new EventEmitter();

  months: Date[];
  currentDate: Date;
  monthTiles: Tile[];
  headerTile: Tile;  
  displayedDates: Date[];
  from: Date;
  to: Date;
  isClicked = [];
  displayDetails: boolean[];

  ngOnInit(): void {
    this.currentDate = new Date();
    this.headerTile = { date: this.currentDate, cols: 4, rows: 1 };
    this.monthTiles = [];
    this.generateCalendar();
  }

 
  // actions from calendar

  prevYear() {
    this.currentDate = new Date(this.currentDate.setFullYear(this.currentDate.getFullYear() - 1));
    this.monthTiles = [];
    this.generateCalendar();
  }

  nextYear() {
    this.currentDate = new Date(this.currentDate.setFullYear(this.currentDate.getFullYear() + 1));
    this.monthTiles = [];
    this.generateCalendar();
  }

  getMonthRange(month:number){
    const from = new Date(this.currentDate.getFullYear(), month, 1);
    const to = new Date(this.currentDate.getFullYear(), month + 1, 0);
    this.rangeSelected.emit({from, to});
    
  }

  getRange(month: number): DateRange{
    this.from = new Date(this.currentDate.getFullYear(), month, 1);
    this.to = new Date(this.currentDate.getFullYear(), month + 1, 0);
    return {from: this.from, to: this.to};
  }

  /** generate the calendar grid */
  generateCalendar() {
    this.months = this.fillDates();
    this.monthTiles = this.months.map(month => ({ date: month, cols: 1, rows: 1, state: 'empty' }));
    this.monthClass(this.displayedDates);
  }

  fillDates() {
    const dates: Date[] = [];
    const displayedDates = [];
    const displayDetails = []; 
    const hover = false;
    for(let i=0; i<12; i++){
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), i, 1);
      dates.push(firstDayOfMonth);
      displayedDates.push(firstDayOfMonth);
      displayDetails.push(hover);
    }
    this.displayDetails = displayDetails;
    this.displayedDates = displayedDates;
    return dates;
  }
  
  /** give a state to month tiles depending of movies' reserved ranges */
  monthClass(dates: Date[]){
    dates.forEach((_, i) => {
      this.disabledDates.forEach(disableRange => {
        this.getRange(i);

        if(this.checkRangeInclusion(disableRange)){
          this.monthTiles[i].state = 'full';
        }

        else if (this.checkRangesIntersections(disableRange)){
          this.monthTiles[i].state = 'partial'; 
        }
      });
    });
  }

  /** check if a range got an intersection with an other range */
  checkRangesIntersections(disableRange: DateRange){
    return isBetween(this.from, disableRange.from, disableRange.to)  
        || isBetween(this.to, disableRange.from, disableRange.to) 
        || isBetween(disableRange.from, this.from, this.to) 
        || isBetween(disableRange.to, this.from, this.to);
  }

  /** check if a date is in a range */
  dateInRange(tDate: Date){
    return tDate >= this.selectedRange.from && tDate <= this.selectedRange.to;
  }

  /** check if a range is fully in an other range */
  checkRangeInclusion(disableRange: DateRange){
    console.log(this.from, this.to, disableRange.from, disableRange.to);
    return isBetween(this.from, disableRange.from, disableRange.to) 
        && isBetween(this.to, disableRange.from, disableRange.to);
  }
}