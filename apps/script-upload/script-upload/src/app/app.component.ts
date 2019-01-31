import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthQuery, User } from '@blockframes/auth';
import { NgWallet } from '@blockframes/ethers';
import { Observable } from 'rxjs';

@Component({
  selector: 'script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private auth: AuthQuery) {}

  async ngOnInit() {
    this.user$ = this.auth.select(state => state.user);
  }

}
