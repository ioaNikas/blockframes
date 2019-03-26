import { ChangeDetectionStrategy, Component, OnInit, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieQuery, Movie } from '@blockframes/movie';
import { DeliveryService, Delivery } from '@blockframes/delivery';
import { Location } from '@angular/common';
import { MatSort, MatDialog } from '@angular/material';
import { TemplatesDialog } from './templates.dialog';

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
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['icon', 'producer', 'distributor', 'status'];

  constructor(
    private movieQuery: MovieQuery,
    private deliveryService: DeliveryService,
    private dialog: MatDialog,
    private location: Location,
  ) { }

  ngOnInit() {
    this.movie$ = this.movieQuery.selectActive();
    this.deliveries$ = this.deliveryService.deliveriesByActiveMovie$;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TemplatesDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public goBack() {
    this.location.back();
  }

}
