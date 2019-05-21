import { ChangeDetectionStrategy, OnInit, Component } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import {
  MatSnackBar,
  MatDialog
} from "@angular/material";

import { network } from "@env";
import { AuthQuery, User } from "@blockframes/auth";
import { RelayerWallet } from "../../relayer-wallet/relayer-wallet";
import { WalletRecoverComponent } from "../recover/recover.component";


@Component({
  selector: 'wallet-view',
  templateUrl: './wallet-view.component.html',
  styleUrls: ['./wallet-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletViewComponent implements OnInit {

  user$: Observable<User>;
  amount: number;
  isBalanceLoading$: Observable<boolean>;
  hasKeystore$: Observable<boolean>;
  private mnemonic = new BehaviorSubject(null);
  private privateKey = new BehaviorSubject(null);
  private loadingPrivateKey = new BehaviorSubject(false);
  mnemonic$ = this.mnemonic.asObservable();
  privateKey$ = this.privateKey.asObservable();
  loadingPrivateKey$ = this.loadingPrivateKey.asObservable();

  constructor(
    public query: AuthQuery,
    private wallet: RelayerWallet,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user$ = this.query.user$;
    this.isBalanceLoading$ = this.query.isBalanceLoading$;
    this.hasKeystore$ = this.wallet.hasKeystore$; // TODO FIX THIS IN #315
  }

  async getPrivateKey() {
    this.loadingPrivateKey.next(true);
    try {
      const privateKey = await this.wallet.privateKey();
      this.privateKey.next(privateKey);
    } catch (err) {
      this.snackBar.open(err, 'close', { duration: 400 })
    }
    this.loadingPrivateKey.next(false);
  }

  // requestTokens() { // TODO FIX THIS IN #315
  //   this.authService.requestTokens(this.amount);
  // }
  
  recover() {
    this.dialog.open(WalletRecoverComponent, { width: '500px' });
  }

  get explorerUrl() {
    return network === 'homestead' as string
      ? 'https://etherscan.io/address/'
      : `https://${network}.etherscan.io/address/`;
  }
}