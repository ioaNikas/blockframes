import { Validators } from '@angular/forms';

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