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
  public amount: number;

  constructor(private authQuery: AuthQuery, private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authQuery.user$;
    this.amount = -1;
  }

  handleChange(value) { // ! ERROR range slider do not emit properly
    console.log(value);
    this.amount = value;
  }

  refreshBalance() {
    this.authService.refreshBalance();
  }

  requestTokens() {
    this.authService.requestTokens(this.amount); // ! ERROR requireUsername() throw every time
  }

}
