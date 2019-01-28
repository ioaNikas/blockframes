import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { keccak256 } from 'ethers/utils';
import { AuthQuery, User } from '@blockframes/auth';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private auth: AuthQuery, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.user$ = this.auth.select(state => state.user);
  }

  public uploaded(content: ArrayBuffer) {
    const bytes = new Uint8Array(content);
    const hash = keccak256(bytes);
    this.snackBar.open(`Your hash: ${hash}`, 'close');
  }
}
