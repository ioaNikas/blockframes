import { FormControl, FormGroupDirective, NgForm, FormGroup, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { passwordValidators, rules } from './validators';

/** Checks if to inputs have the same value */
export class RepeatPasswordStateMatcher implements ErrorStateMatcher {
  private password: string;
  private confirm: string;

  constructor(password: string = 'password', confirm: string = 'confirm') {
    this.password = password;
    this.confirm = confirm;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get(this.password).value !== control.parent.get(this.confirm).value && control.dirty)
  }
}

/** Checks if to input are not both setted */
export class XorControlsStateMatcher implements ErrorStateMatcher {
  private first: string;
  private second: string;

  constructor(first: string = 'first', second: string = 'second') {
    this.first = first;
    this.second = second;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && !!control.parent.get(this.first).value === true && !!control.parent.get(this.first).value === !!control.parent.get(this.second).value && control.dirty)
  }
}

export class AbstractFormControls {
  public controls: any;
  public validators  = [];

  public rules = rules;

  public passwordValidators = passwordValidators;

  /** Require password and password confirm inputs to be the same */
  protected checkPasswords(password: string = 'password', confirm: string = 'confirm'): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } | null => {
      return group.controls[password].value === group.controls[confirm].value ? null : { passwordsNotMatching: true }
    };
  };

  /** Require **either** mnemonic **or** private key **but not both** */
  protected requireMnemonicXorPrivateKey(control: FormControl) {
    const { mnemonic, privateKey } = control.value;
    return (!!mnemonic !== !!privateKey) ? null : { bothEmpty: true }; // logical XOR
  }
}
