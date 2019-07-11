import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CreateKeyPasswordForm } from '../forms/create-key-password-form';

@Component({
  selector: 'wallet-create-password-form',
  templateUrl: './wallet-create-password-form.component.html',
  styleUrls: ['./wallet-create-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletCreatePasswordFormComponent {
  public confirmPasswordForm = new CreateKeyPasswordForm();

  /** An event that will send the setted password by the user */
  @Output() userPassword: EventEmitter<string> = new EventEmitter();

  constructor() {}

  public submitPassword(){
    this.userPassword.emit(this.confirmPasswordForm.get('password').value);
  }
}
