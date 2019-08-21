import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input} from '@angular/core';
import { CalendarRange, isBetween } from '@blockframes/utils';

interface Tile {
  cols: number;
  rows: number;
  date: Date;
  state: string;
}

@Component({
  selector: 'month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

  @Input() selectedRange: CalendarRange;
  @Input() disabledDates: CalendarRange[];
  @Output() rangeSelected = new EventEmitter();

  months: Date[];
  currentDate: Date;
  monthTiles: Tile[];
  headerTile: Tile;  
  displayedDates: Date[];
  begin: Date;
  end: Date;
  isClicked = [];
  displayDetails: boolean[];

  ngOnInit(): void {
    this.headerTile = {date: this.currentDate = new Date(), cols: 4, rows: 1, state:''};
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
    const begin = new Date(this.currentDate.getFullYear(), month, 1);
    const end = new Date(this.currentDate.getFullYear(), month + 1, 0);
    this.rangeSelected.emit({begin, end});
    
  }

  getRange(month: number): CalendarRange{
    this.begin = new Date(this.currentDate.getFullYear(), month, 1);
    this.end = new Date(this.currentDate.getFullYear(), month + 1, 0);
    return {begin: this.begin, end: this.end};
  }

  /** generate the calendar grid */
  generateCalendar() {
    this.months = this.fillDates();
    this.months.forEach((month) => this.monthTiles.push({date: month, cols: 1, rows:1, state: 'empty'}));
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
          this.monthTiles[i].state = 'full-taken';
        }

        else if (this.checkRangesIntersections(disableRange)){
          this.monthTiles[i].state = 'half-taken'; 
        }
      });
    });
  }

  /** check if a range got an intersection with an other range */
  checkRangesIntersections(disableRange: CalendarRange){
    return isBetween(this.begin, disableRange.begin, disableRange.end)  
        || isBetween(this.end, disableRange.begin, disableRange.end) 
        || isBetween(disableRange.begin, this.begin, this.end) 
        || isBetween(disableRange.end, this.begin, this.end);
  }

  /** check if a date is in a range */
  dateInRange(tDate: Date){
    return tDate >= this.selectedRange.begin && tDate <= this.selectedRange.end;
  }

  /** check if a range is fully in an other range */
  checkRangeInclusion(disableRange: CalendarRange){
    return isBetween(this.begin, disableRange.begin, disableRange.end) 
        && isBetween(this.end, disableRange.begin, disableRange.end);
  }
}