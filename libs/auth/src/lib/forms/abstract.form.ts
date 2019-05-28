import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class RepeatPasswordStateMatcher implements ErrorStateMatcher {
  private password: string;
  private confirm: string;

  constructor(password: string, confirm: string) {
    this.password = password;
    this.confirm = confirm;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get(this.password).value !== control.parent.get(this.confirm).value && control.dirty)
  }
}

export class AbstractFormControls {
  public controls: any;
  public validators  = [];
  public passwordsMatcher: RepeatPasswordStateMatcher;

  public rules = {
    password : {
      min: 6,
      max: 24
    }
  }

  public passwordValidators = [
    Validators.required,
    Validators.minLength(this.rules.password.min),
    Validators.maxLength(this.rules.password.max)
  ];
}
