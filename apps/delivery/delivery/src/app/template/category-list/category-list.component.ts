import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateQuery, TemplateService } from '../+state';
import { MaterialStore, MaterialService } from '../../material/+state';
import { template } from '@angular/core/src/render3';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddTemplateDialog } from '../template-list/template-list.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

  @Input() template;


  constructor(
    private query: TemplateQuery,
    private materialStore: MaterialStore,
    private service: TemplateService,
    private materialService: MaterialService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public selectCategory(materials) {
    const materialsIds = [];
    for (const material of materials) {
      materialsIds.push(material.id)
    }
    this.materialStore.setActive(materialsIds);
  }


  public addCategory(): void {
    this.dialog.open(AddCategoryDialog, {
      width: '400px'
    });
  }

}

@Component({
  selector: 'add-category-dialog',
  template: `
    <div mat-dialog-content>
      <h2>Add a new category</h2>
      <mat-form-field appearance="outline" fxLayoutAlign="center">
        <mat-label>File name</mat-label>
        <input #category matInput placeholder="New category name" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions fxLayoutAlign="center">
      <button mat-stroked-button color="primary" (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="addCategory(category.value)">Create</button>
    </div>
  `
})
export class AddCategoryDialog {
  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialog>,
    private service: MaterialService,
    ) {}

  public addCategory(category) {
    this.service.addMaterial(category)
    this.close();
  }

  public close(): void {
    this.dialogRef.close();
  }
}
