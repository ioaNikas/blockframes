import { Component, OnInit } from '@angular/core';
import { AuthService, AuthQuery, User } from '../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private service: AuthService, private query: AuthQuery) {}

  ngOnInit() {
    this.user$ = this.query.select(state => state.user);
  }

  public login() {
    this.service.login().catch(err => console.error(err));
  }

  public logout() {
    this.service.logout().catch(err => console.error(err));
  }
}
