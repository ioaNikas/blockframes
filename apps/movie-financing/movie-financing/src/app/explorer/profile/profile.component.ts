import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthQuery, User, AuthService } from '@blockframes/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'financing-explorer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancingExplorerProfileComponent implements OnInit {

  public user$: Observable<User>;
  public isBalanceLoading$: Observable<boolean>;
  public amount: number;

  constructor(private authQuery: AuthQuery, private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authQuery.user$;
    this.isBalanceLoading$ = this.authQuery.isBalanceLoading$;
    this.amount = 0.01;
  }

  handleChange(value) {
    this.amount = value;
  }

  // refreshBalance() { // TODO FIX IN ISSUE #315
  //   this.authService.refreshBalance();
  // }

  // requestTokens() { // TODO FIX IN ISSUE #315
  //   this.authService.requestTokens(this.amount);
  // }

}
