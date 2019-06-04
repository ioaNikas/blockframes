import { FormControl } from '@angular/forms';
import { emailValidators, passwordValidators, stringValidators } from './validators';

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

export class PrivateKeyControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : stringValidators);
  }
}

export class MnemonicControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : stringValidators);
  }
}

export class StringControl extends FormControl{
  constructor (value : string = '', disabled : boolean = false, validators? : any[]) {
    super({ value, disabled }, validators !== undefined ? validators : stringValidators);
  }
}
