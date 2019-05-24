import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { KeyManagerQuery, Key } from "../+state";
import { Observable } from "rxjs";

@Component({
  selector: 'key-manager-list',
  templateUrl: './key-manager-list.component.html',
  styleUrls: ['./key-manager-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyManagerListComponent implements OnInit {

  @Input() ensDomain: string;
  keys$: Observable<Key[]>;

  constructor(
    private query: KeyManagerQuery
  ){}

  ngOnInit() {
    this.keys$ = this.query.getAllKeysOfUser(this.ensDomain);
  }
}
