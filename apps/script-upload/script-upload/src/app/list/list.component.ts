import { Component, OnInit } from '@angular/core';
import { ScriptQuery, Script } from '@blockframes/script';
import { Observable } from 'rxjs';

@Component({
  selector: 'script-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public scripts$: Observable<Script[]>;

  constructor(private query: ScriptQuery) {}

  ngOnInit() {
    this.scripts$ = this.query.selectAll();
  }
}
