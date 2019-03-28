import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TemplateQuery } from '../../template/+state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { NewTemplateComponent } from './new-template.component';

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
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.template$ = this.templateQuery.materialsByTemplate$;
  }

  public openDialog() {
    this.dialog.open(NewTemplateComponent);
  }
}
