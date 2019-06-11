import { Validators, FormGroup, ValidatorFn, FormControl } from '@angular/forms';

export const rules = {
  password : {
    min: 6,
    max: 24
  }
}

export const emailValidators = [
  Validators.required,
  Validators.email
]

export const passwordValidators = [
  Validators.required,
  Validators.minLength(rules.password.min),
  Validators.maxLength(rules.password.max)
];

export const stringValidators = [

];

export const yearValidators = [
  Validators.pattern("^[1-2][0-9]{3}$"),
];


/** Require password and password confirm inputs to be the same */
export function checkPasswords(password: string = 'password', confirm: string = 'confirm'): ValidatorFn {
  return (group: FormGroup): { [key: string]: boolean } | null => {
    return group.controls[password].value === group.controls[confirm].value ? null : { passwordsNotMatching: true }
  };
};

/** Require **either** mnemonic **or** private key **but not both** */
export function requireMnemonicXorPrivateKey(control: FormControl) {
  const { mnemonic, privateKey } = control.value;
  return (!!mnemonic !== !!privateKey) ? null : { bothEmpty: true }; // logical XOR
}