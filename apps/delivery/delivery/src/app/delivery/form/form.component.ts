import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Template, TemplateQuery, TemplateService } from '../../template/+state';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'delivery-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  public template$: Observable<any>;

  constructor(
    private templateQuery: TemplateQuery,
    private templateService: TemplateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.template$ = this.templateQuery.materialsByTemplate$;
  }

  public openDialog() {
    this.dialog.open(NewTemplateDialogComponent);
  }
}

@Component({
  selector: 'new-template-dialog',
  template: `
    <div mat-dialog-content>
      <h2>Save as a new template</h2>
      <mat-form-field appearance="outline" fxLayoutAlign="center">
        <mat-label>File name</mat-label>
        <input #templateName matInput placeholder="New template name" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions fxLayoutAlign="center">
      <button mat-stroked-button color="primary" (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="saveTemplate(templateName.value)">
        Save Template
      </button>
    </div>
  `
})
export class NewTemplateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewTemplateDialogComponent>,
    private templateService: TemplateService
  ) {}

  public saveTemplate(templateName) {
    this.templateService.saveTemplate(templateName);
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
