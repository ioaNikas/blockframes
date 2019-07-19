import { ChangeDetectionStrategy, OnInit, Component } from "@angular/core";
import { Observable } from "rxjs";

import { WalletQuery, Wallet, WalletService } from "../+state";
import { Key } from "../../key-manager/+state";
import { Router } from "@angular/router";


@Component({
  selector: 'wallet-view',
  templateUrl: './wallet-view.component.html',
  styleUrls: ['./wallet-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletViewComponent implements OnInit {

  wallet$: Observable<Wallet>;
  isLoading$: Observable<boolean>;
  // ensName$: Observable<string>;

  constructor(
    public router: Router,
    public service: WalletService,
    public query: WalletQuery
  ) {}

  ngOnInit() {
    this.wallet$ = this.query.select();
    this.isLoading$ = this.query.selectLoading();
    // this.ensName$ = this.query.select('ensDomain')
  }

  // TODO implment this function : issue 544
  importKey() {
    console.warn('NOT IMPLEMENTED');
  }

  async deleteKey(key: Key) {
    await this.service.setDeleteKeyTx(key.address);
    this.router.navigateByUrl('/layout/o/account/wallet/send');
  }
}
