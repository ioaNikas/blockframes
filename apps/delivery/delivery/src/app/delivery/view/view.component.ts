import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'delivery-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('coucou')
  }

}
