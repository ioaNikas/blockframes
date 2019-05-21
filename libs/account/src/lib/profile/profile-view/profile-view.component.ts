
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthQuery, User } from '@blockframes/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileViewComponent implements OnInit {

  user$: Observable<User>;

  constructor(public query: AuthQuery){}

  ngOnInit() {
    this.user$ = this.query.user$;
  }
}