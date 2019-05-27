import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

function samePassword(control: FormGroup) {
  const { password, confirm } = control.value;
  return password === confirm
    ? null
    : { notSame: true }
}

function requireMnemonicOrPrivateKey(control: FormControl) {
  const { mnemonic, privateKey } = control.value;
  return (!!mnemonic || !!privateKey) ? null : {bothEmpty: true};
}

@Component({
  selector: 'key-manager-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverComponent implements OnInit {
  private form: FormGroup;
  public loading = false;

  constructor(
    private dialog: MatDialogRef<RecoverComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      privateKey: new FormControl('', []),
      mnemonic: new FormControl('', []),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [])
    }, { validators: [samePassword, requireMnemonicOrPrivateKey] });
  }

  cancel() {
    this.dialog.close(false);
  }

  async recover() {
    if (!this.form.valid) {
      this.snackBar.open('Invalid values', 'close', { duration: 1000 });
      return;
    }
    try {
      this.loading = true;
      const { privateKey, password } = this.form.value;
      // await this.wallet.recoverWithPrivateKey(privateKey, password);
      this.dialog.close(true);
    } catch(err) {
      this.snackBar.open(err, 'close', { duration: 1000 });
      this.dialog.close(false);
    }

  }
}
