import { Component, OnInit } from '@angular/core';
import { IpQuery, Ip } from '@blockframes/ip';
import { Observable } from 'rxjs';

@Component({
  selector: 'ip-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public ipList$: Observable<Ip[]>;
  public ipForm$: Observable<Ip>;

  constructor(private query: IpQuery) {}

  ngOnInit() {
    this.ipList$ = this.query.selectAll();
    this.ipForm$ = this.query.form$;
  }
}
