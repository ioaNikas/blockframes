import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

// @todo find something more elegant
const rules = {
  password : {
    min: 6,
    max: 24
  }
}

const emailValidators = [
  Validators.required,
  Validators.email
]

const passwordValidators = [
  Validators.required,
  Validators.minLength(rules.password.min),
  Validators.maxLength(rules.password.max)
];

export class EmailControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : emailValidators);
  }
}

export class PasswordControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : passwordValidators);
  }
}

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

  public rules = rules;

  public passwordValidators = passwordValidators;
}
