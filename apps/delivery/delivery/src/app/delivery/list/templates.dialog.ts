import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Template } from '../../template/+state';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

export interface DialogData {
  templates: Observable<Template[]>;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h2>
      Add a delivery
      <h2>
        <small>Choose a template</small>
        <div mat-dialog-actions>
          <button mat-raised-button (click)="close()">CANCEL</button>
          <button mat-raised-button color="primary">
            OK !
          </button>
        </div>
      </h2>
    </h2>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatesDialog {
  constructor(
    public dialogRef: MatDialogRef<TemplatesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public close(): void {
    this.dialogRef.close();
  }
}
