import { ChangeDetectionStrategy, Component, OnInit  } from '@angular/core';
import { MovieQuery, Movie } from '@blockframes/movie';
import { DeliveryService, Delivery } from '@blockframes/delivery';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Template, TemplateService, TemplateQuery } from '../../template/+state';
import { MaterialService } from '../../material/+state';
import { Observable } from 'rxjs';

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
    this.dialog.open(ChooseTemplateDialogComponent, {width: "80%", height: "80%"});
  }

  public goBack() {
    this.location.back();
  }

}

@Component({
  selector: 'choose-template-dialog',
  template: `
  <section mat-dialog-content fxLayout="row wrap" fxLayoutAlign="space-around">
  <article fxFlex.gt-md="25" fxFlex.gt-sm="50" fxFlex="100">
    <mat-card class="card-add" mat-card class="example-card">
      <mat-card-actions>
        <button color="primary" mat-icon-button matRipple>
          <mat-icon>add_circle</mat-icon>
          Add Template
        </button>
      </mat-card-actions>
    </mat-card>
  </article>
  <article
    fxFlex.gt-md="25"
    fxFlex.gt-sm="50"
    fxFlex="100"
    *ngFor="let template of (templates$ | async)"
  >
    <mat-card class="example-card">
      <img mat-card-image src="https://via.placeholder.com/150.png" alt="Preview of template" />
      <mat-card-content>
        <mat-card-title>
          {{ template.name }}
        </mat-card-title>
      </mat-card-content>
    </mat-card>
  </article>
</section>
  `
})
export class ChooseTemplateDialogComponent implements OnInit {

  public templates$: Observable<Template[]>;

  constructor(
    public dialogRef: MatDialogRef<ChooseTemplateDialogComponent>,
    public templateService: TemplateService,
    public materialService: MaterialService,
    public templateQuery: TemplateQuery,
    ) {}

  ngOnInit() {
    this.templateService.subscribeOnOrganizationTemplates$.subscribe(); //todo unsubscribe
    this.materialService.subscribeOnOrganizationMaterials$.subscribe(); //todo unsubscribe

    this.templates$ = this.templateQuery.selectAll();
  }

  public chooseTemplate() {
    console.log('coucou');
  }

  public close(): void {
    this.dialogRef.close();
  }
}
