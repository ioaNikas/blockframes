import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { KeyManagerQuery, Key, KeyManagerService } from "../+state";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material";
import { RecoverComponent } from "../recover/recover.component";
import { CreatePasswordComponent } from "../create-password/create-password.component";

@Component({
  selector: 'key-manager-list',
  templateUrl: './key-manager-list.component.html',
  styleUrls: ['./key-manager-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyManagerListComponent implements OnInit {

  @Input() ensDomain: string;
  activeKey$: Observable<Key>;
  keys$: Observable<Key[]>;

  constructor(
    private query: KeyManagerQuery,
    private dialog: MatDialog,
    private service: KeyManagerService
  ){}

  ngOnInit() {
    this.activeKey$ = this.query.selectActive();
    this.keys$ = this.query.getAllKeysOfUser(this.ensDomain);
  }

  async createRandom() {
    const ref = this.dialog.open(CreatePasswordComponent, { width: '250px', data: {confirm: true}});
    const password = await ref.afterClosed().toPromise();
    if (!password) {
      console.warn('No password provided !');
      return;
    }
    this.service.createFromRandom(this.ensDomain, password);
  }

  async importKey() {
    this.dialog.open(RecoverComponent, {data: {ensDomain: this.ensDomain}});
  }
}
