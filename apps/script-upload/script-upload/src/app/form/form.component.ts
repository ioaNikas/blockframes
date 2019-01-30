import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScriptHashService } from '@blockframes/script';
import { utils } from 'ethers';
import { User, AuthQuery } from '@blockframes/auth';

@Component({
  selector: 'script-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public user: User;

  constructor(
    private auth: AuthQuery,
    private snackBar: MatSnackBar,
    private scripts: ScriptHashService
  ) {}

  ngOnInit() {
    this.user = this.auth.user;
  }

  public async uploaded(content: Uint8Array) {
    const hash = utils.keccak256(content);
    this.snackBar.open(`Your hash: ${hash}`, 'close');

    const receipt = await this.scripts.addScript(hash);
    this.snackBar.open(`Your TX hash: ${receipt.hash}`, 'close');
  }
}
