import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { KeyManagerService } from '../+state';

function samePassword(control: FormGroup) { // TODO ISSUE #408
  const { password, confirm } = control.value;
  return password === confirm
    ? null
    : { notSame: true }
}

/** Require **either** mnemonic **or** private key **but not both** */
function requireMnemonicXorPrivateKey(control: FormControl) {
  const { mnemonic, privateKey } = control.value;
  return (!!mnemonic !== !!privateKey) ? null : {bothEmpty: true}; // logical XOR
}

export interface ImportKeyData {
  ensDomain: string,
}

@Component({
  selector: 'key-manager-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverComponent implements OnInit {
  form: FormGroup;

  constructor(
    private service: KeyManagerService,
    private dialog: MatDialogRef<RecoverComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ImportKeyData
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      privateKey: new FormControl('', []),
      mnemonic: new FormControl('', []),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm: new FormControl('', [])
    }, { validators: [samePassword, requireMnemonicXorPrivateKey] });
  }

  cancel() {
    this.dialog.close(false);
  }

  async recover() {
    if (!this.form.valid) {
      this.snackBar.open('Invalid values', 'close', { duration: 1000 });
      this.dialog.close(false);
      return;
    }
    const { mnemonic, privateKey, password } = this.form.value;
    if (!!mnemonic) {
      this.service.importFromMnemonic(this.data.ensDomain, mnemonic, password);
    } else if (!!privateKey) {
      this.service.importFromPrivateKey(this.data.ensDomain, privateKey, password);
    } else {
      this.dialog.close(false);
      throw new Error('There should be either a mnemonic or a private key but none was provided !');
    }
    this.dialog.close(true);
  }
}
