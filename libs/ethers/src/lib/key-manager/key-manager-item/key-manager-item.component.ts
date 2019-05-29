import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { Key, KeyManagerService } from "../+state";
import { keyToAddressPart } from "@blockframes/utils";

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
    private service: KeyManagerService
  ){}

  ngOnInit() {
    const addressParts = keyToAddressPart(this.key, 6);
    this.addressStart = addressParts.start;
    this.addressEnd = addressParts.end;
  }

  async unlockKey() {
    this.service.unlockAndSetActive(this.key);
  }

  lockKey() {
    this.service.deactivateKey();
  }

  async deleteKey() {
    this.service.deleteKey(this.key);
  }
}