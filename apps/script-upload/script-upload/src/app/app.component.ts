import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthQuery, User } from '@blockframes/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public user$: Observable<User>;

  constructor(
    private storage: AngularFireStorage,
    private auth: AuthQuery,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.user$ = this.auth.select(state => state.user);
  }
}
