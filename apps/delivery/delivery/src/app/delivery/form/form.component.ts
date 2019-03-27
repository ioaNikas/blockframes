import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Template, TemplateQuery, TemplateService } from '../../template/+state';
import { Observable } from 'rxjs';

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
    ) { }

  ngOnInit() {
    this.template$ = this.templateQuery.materialsByTemplate$
  }


}
