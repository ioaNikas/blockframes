import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Material } from '../../material/+state';


@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormComponent implements OnInit {

  @Input() materials: Material[];

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
