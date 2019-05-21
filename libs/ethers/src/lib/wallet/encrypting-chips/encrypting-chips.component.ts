import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthQuery } from "@blockframes/auth";

@Component({
  selector: 'wallet-encrypting-chips',
  templateUrl: './encrypting-chips.component.html',
  styleUrls: ['./encrypting-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncryptingChipsComponent implements OnInit {
  public encryting$: Observable<boolean>;

  constructor(private auth: AuthQuery) {}

  ngOnInit() {
    this.encryting$ = this.auth.encrytping$; // TODO USE WALLET STATE AFTER ISSUE #315
  }
}