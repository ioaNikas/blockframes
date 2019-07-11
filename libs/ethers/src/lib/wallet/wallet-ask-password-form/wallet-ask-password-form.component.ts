import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'wallet-ask-password-form',
  templateUrl: './wallet-ask-password-form.component.html',
  styleUrls: ['./wallet-ask-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletAskPasswordFormComponent {
  public password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(24)
  ]);

  /** An event that will send the setted password by the user */
  @Output() userPassword: EventEmitter<string> = new EventEmitter();
  
  /** An event that will notify the parent component that the user forgot his password */
  @Output() forgotPassword: EventEmitter<void> = new EventEmitter();

  constructor() {}
}
