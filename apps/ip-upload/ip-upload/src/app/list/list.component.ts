import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpQuery, Ip, IpService } from '@blockframes/ip';
import { Observable } from 'rxjs';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { tap, map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ip-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public ipList$: Observable<Ip[]>;
  public ipForm$: Observable<Ip>;
  public selected: string[] = ['fDnkMRGAEvaCm7I7NZPh'];

  constructor(private service: IpService, private query: IpQuery) {}

  ngOnInit() {
    this.ipForm$ = this.query.form$;
    this.ipList$ = this.query.selectAll();
  }

  get isIndeterminate() {
    return this.selected.length > 0 && this.selected !== this.query.getValue().ids;
  }

  get isAllSelected() {
    return this.selected === this.query.getValue().ids;
  }

  // Select / Unselect
  public toggleOne({ checked }, id: string) {
    console.log(this.selected);
    checked
      ? this.selected.push(id)
      : this.selected.splice(this.selected.indexOf(id), 1);
  }

  // Select / Unselect all ips
  public toggleAll({checked}) {
    checked
      ? this.selected = this.query.getValue().ids as string[]
      : this.selected = [];
  }

  public remove(ids: string[]) {
    this.service.remove(ids);
  }
}
