import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { AuthQuery, User, AuthService } from '../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggerComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private service: AuthService, private query: AuthQuery, private dialog: MatDialog) {}

  ngOnInit() {
    this.user$ = this.query.select(state => state.user);
  }

  public openLogin() {
    this.dialog.open(SignupComponent);
  }

  public logout() {
    this.service.logout();
  }
}
