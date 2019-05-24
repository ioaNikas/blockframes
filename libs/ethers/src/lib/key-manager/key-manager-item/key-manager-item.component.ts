import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { Key } from "../+state";

@Component({
  selector: 'key-manager-item',
  templateUrl: './key-manager-item.component.html',
  styleUrls: ['./key-manager-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyManagerItemComponent implements OnInit {
  @Input() key: Key;

  addressStart: string;
  addressEnd: string;

  constructor(){}

  ngOnInit() {
    const address = JSON.parse(this.key.keyStore).address;
    this.addressStart = address.slice(0, 6);
    this.addressEnd = address.slice(-6);
  }
}