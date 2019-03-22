import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { TemplateService, Template, TemplateQuery } from '../+state';
import { OrganizationStore } from '@blockframes/organization';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {
  public templates$: Observable<Template[]>;

  constructor(
    private service: TemplateService,
    private organizationStore: OrganizationStore,
    private query: TemplateQuery,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.organizationStore.setActive('eclAGMAMPl6l5lPov2ql');  // while organization does not stay active
    this.service.subscribeOnOrganizationTemplates$.subscribe();

    this.templates$ = this.query.selectAll();
  }

  public addTemplateDialog(): void {
    this.dialog.open(AddTemplateDialog, {
      width: '400px'
    });
  }

  public deleteTemplate(id) {
    console.log(id)
    this.service.deleteTemplate(id);
  }
}

@Component({
  selector: 'add-template-dialog',
  template: `
    <div mat-dialog-content>
      <h2>Add a new template</h2>
      <mat-form-field appearance="outline" fxLayoutAlign="center">
        <mat-label>File name</mat-label>
        <input #templateName matInput placeholder="New template name" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions fxLayoutAlign="center">
      <button mat-stroked-button color="primary" (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="addTemplate(templateName.value)">Create</button>
    </div>
  `
})
export class AddTemplateDialog {
  constructor(
    public dialogRef: MatDialogRef<AddTemplateDialog>,
    private service: TemplateService,
    ) {}

  public addTemplate(templateName) {
    this.service.addTemplate(templateName);
    this.close();
  }

  public close(): void {
    this.dialogRef.close();
  }
}
