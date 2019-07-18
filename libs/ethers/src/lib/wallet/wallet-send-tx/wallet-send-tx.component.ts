import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { WalletQuery, Wallet, WalletService } from "../+state";
import { Observable, BehaviorSubject } from "rxjs";
import { Key, KeyManagerQuery, KeyManagerService } from "../../key-manager/+state";
import { Wallet as EthersWallet } from "ethers";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

enum steps {
  select,
  password,
  confirm,
  end
}

@Component({
  selector: 'wallet-send-tx',
  templateUrl: './wallet-send-tx.component.html',
  styleUrls: ['./wallet-send-tx.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletSendTxTunnelComponent implements OnInit {

  steps = steps;
  step = this.steps.select;
  key: Key;
  activeKey: EthersWallet;
  wallet$: Observable<Wallet>;
  isDecrypting$: Observable<boolean>;
  redirectRoute: string;
  isDeploying$ = new BehaviorSubject(false);
  isPending$ = new BehaviorSubject(false);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private query: WalletQuery,
    private walletService: WalletService,
    private keyManagerQuery: KeyManagerQuery,
    private keyManagerService: KeyManagerService,
  ){}

  ngOnInit(){
    this.wallet$ = this.query.select();
    this.isDecrypting$ = this.keyManagerQuery.selectLoading();

    // TODO remove this ASAP see issue #617
    // check if there is a ?redirect=<redirect url> in the route, otherwise use default redirect
    this.route.queryParams.pipe(map(params => 'redirect' in params ? params.redirect : '/layout/o/account/wallet'))
      .subscribe(redirectRoute => this.redirectRoute = redirectRoute);
  }

  handleKeySelection(key: Key) {

    // this.key = key; // TODO use emited key in params, i.e. use this line and delte the line below
    this.key = this.keyManagerQuery.getMainKeyOfUser(this.query.getValue().ensDomain);
    this.step = this.steps.password;
  }

  async setPassword(password: string) {

    if (!this.query.getValue().hasERC1077) {
      this.isDeploying$.next(true);
      this.walletService.deployERC1077(this.key.ensDomain, this.key.address).then(res => {
        this.isDeploying$.next(false);
      });
    }

    this.step = this.steps.confirm;
    this.activeKey = await this.keyManagerService.unlockKey(this.key, password);
  }

  async handleConfirmation() {
    if (!this.query.getValue().hasERC1077) {
      throw new Error('Your smart-wallet is not yet deployed');
    }
    this.step = this.steps.end;
    this.isPending$.next(true);
    const signedMetaTx = await this.walletService.prepareMetaTx(this.key.ensDomain, this.activeKey);
    this.walletService.sendSignedMetaTx(this.key.ensDomain, signedMetaTx).then(() => {
      this.isPending$.next(false);
    });
  }

  handleRedirect() {
    this.router.navigateByUrl(this.redirectRoute);
  }
}