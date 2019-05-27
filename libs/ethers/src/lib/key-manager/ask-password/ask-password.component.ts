import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface AskPasswordData {
  confirm: boolean;
}

@Component({
  selector: 'key-manager-ask-password',
  templateUrl: './ask-password.component.html',
  styleUrls: ['./ask-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AskPasswordComponent {

  constructor(
    private dialog: MatDialogRef<AskPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AskPasswordData
    ) { }

  cancel() {
    this.dialog.close();
  }

  async unlockWallet(password: string, passwordConfirm) {
    if (this.data.confirm && password !== passwordConfirm) {
      this.dialog.close();
      return;
    }
    this.dialog.close(password);
  }
}
