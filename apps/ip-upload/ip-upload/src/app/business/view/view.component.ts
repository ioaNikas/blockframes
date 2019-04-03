import { Component, OnInit } from '@angular/core';
import { IpQuery, Ip } from '@blockframes/ip';

@Component({
  selector: 'ip-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public ip: Ip;

  constructor(
    private query: IpQuery
  ) {}

  ngOnInit() {
    this.ip = this.query.getActive() as Ip;
  }

}
