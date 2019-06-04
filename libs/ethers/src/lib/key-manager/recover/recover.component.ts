import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { KeyManagerService } from '../+state';
import { RecoverForm } from '../forms/recover.form';

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
  form: RecoverForm;

  constructor(
    private service: KeyManagerService,
    private dialog: MatDialogRef<RecoverComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ImportKeyData
  ) { }

  ngOnInit() {
    this.form = new RecoverForm();
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
