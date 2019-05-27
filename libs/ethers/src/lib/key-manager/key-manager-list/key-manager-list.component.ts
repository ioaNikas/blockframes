import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { KeyManagerQuery, Key, KeyManagerService } from "../+state";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material";
import { AskPasswordComponent } from "../ask-password/ask-password.component";
import { RecoverComponent } from "../recover/recover.component";

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
    const ref = this.dialog.open(AskPasswordComponent, { width: '250px', data: {confirm: true}});
    const password = await ref.afterClosed().toPromise();
    if (!password) throw new Error('No password provided');
    this.service.createFromRandom(this.ensDomain, password);
  }

  async importKey() {
    const ref = this.dialog.open(RecoverComponent);
    console.log(await ref.afterClosed().toPromise());
  }
}
