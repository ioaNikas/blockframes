import { ChangeDetectionStrategy, Component, OnInit  } from '@angular/core';
import { MovieQuery, Movie } from '@blockframes/movie';
import { DeliveryService, Delivery } from '@blockframes/delivery';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { TemplatePickerComponent } from '../template-picker/template-picker.component';

@Component({
  selector: 'delivery-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  public movie$: Observable<Movie>;
  public deliveries$: Observable<Delivery[]>;

  // Material table
  public displayedColumns: string[] = ['icon', 'stakeholder1', 'stakeholder2', 'status'];

  constructor(
    private movieQuery: MovieQuery,
    private deliveryService: DeliveryService,
    private location: Location,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.movie$ = this.movieQuery.selectActive();
    this.deliveries$ = this.deliveryService.deliveriesByActiveMovie$;
  }

  public openDialog() {
    this.dialog.open(TemplatePickerComponent, {width: "80%", height: "80%"});
  }

  public goBack() {
    this.location.back();
  }

}
