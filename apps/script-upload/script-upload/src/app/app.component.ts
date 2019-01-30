import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthQuery, User } from '@blockframes/auth';
import { ScriptHashService } from '@blockframes/script';
import { Observable } from 'rxjs';
import { utils } from 'ethers';

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
