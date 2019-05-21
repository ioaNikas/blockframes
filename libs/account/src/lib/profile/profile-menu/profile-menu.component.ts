
import { Component, ChangeDetectionStrategy, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AuthQuery, AuthService } from '@blockframes/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'account-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent implements OnInit{
  public user$: Observable<User>;

  constructor(
    private service: AuthService,
    private auth: AuthQuery,
    private router: Router,
  ){}

  ngOnInit(){
    this.user$ = this.auth.user$;
  }

  public async logout() {
    await this.service.logout();
    this.router.navigate(['/auth']);
  }
}