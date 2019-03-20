import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'delivery-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
