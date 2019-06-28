import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TemplateService } from '../../../template/+state/template.service';
import { Observable } from 'rxjs';
import { Organization, OrganizationQuery } from '@blockframes/organization';
import { FormGroup, FormControl } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'delivery-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTemplateComponent implements OnInit, OnDestroy {
  public isUpdateTemplate = false;
  private isAlive = true;

  public form = new FormGroup({
    name: new FormControl(),
    organization: new FormControl()
  });

  constructor(
    private dialogRef: MatDialogRef<NewTemplateComponent>,
    private templateService: TemplateService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    // Check if the name already exists in the selected organization
    this.form.valueChanges.pipe(takeWhile(() => this.isAlive)).subscribe(values =>
      this.templateService.nameExists(values.name, values.organization)
        ? (this.isUpdateTemplate = true)
        : (this.isUpdateTemplate = false)
    );
  }

  public saveTemplate(name: string) {
    this.templateService.saveAsTemplate(name);
    this.dialogRef.close();
    this.snackBar.open('Saved template : ' + name + ' !', 'close', { duration: 2000 });
  }

  public updateTemplate(name: string) {
    this.templateService.updateTemplate(name);
    this.dialogRef.close();
    this.snackBar.open('Updated template : ' + name + ' !', 'close', { duration: 2000 });
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
