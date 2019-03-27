import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AuthQuery } from '@blockframes/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'delivery-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private auth: AuthQuery, private router: Router) {}

  async ngOnInit() {
    this.user$ = this.auth.select(state => state.user);
  }

  public logout() {
    this.router.navigate([''])
  }

}
