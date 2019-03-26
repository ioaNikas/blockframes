import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'delivery-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
