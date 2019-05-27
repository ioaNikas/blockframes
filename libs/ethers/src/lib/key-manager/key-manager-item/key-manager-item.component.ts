import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { Key, KeyManagerService } from "../+state";
import { AskPasswordComponent } from "../ask-password/ask-password.component";
import { MatDialog } from '@angular/material';

@Component({
  selector: 'key-manager-item',
  templateUrl: './key-manager-item.component.html',
  styleUrls: ['./key-manager-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyManagerItemComponent implements OnInit {
  @Input() key: Key;
  @Input() active = false;

  addressStart: string;
  addressEnd: string;

  constructor(
    private dialog: MatDialog,
    private service: KeyManagerService
  ){}

  ngOnInit() {
    const address = JSON.parse(this.key.keyStore).address;
    this.addressStart = address.slice(0, 6);
    this.addressEnd = address.slice(-6);
  }

  async unlockKey() {
    const ref = this.dialog.open(AskPasswordComponent, { width: '250px', data: {confirm: false}})
    const password = await ref.afterClosed().toPromise()
    if (!password) throw new Error('No password provided');
    this.service.unlockAndSetActive(this.key, password);
  }

  lockKey() {
    this.service.lockActiveKey();
  }

  async deleteKey() {
    const ref = this.dialog.open(AskPasswordComponent, { width: '250px', data: {confirm: false}})
    const password = await ref.afterClosed().toPromise()
    if (!password) throw new Error('No password provided');
    this.service.deleteKey(this.key);
  }
}