import {
  EntityControl,
  EntityRulesForm,
  PasswordControl,
  EmailControl,
  checkPasswords
} from '@blockframes/utils';
import { ValidatorFn } from '@angular/forms';

interface SignUp {
  email: string
  password: string 
  confirm: string
}

function createControls(entity?: SignUp): EntityControl<SignUp> {
  return {
    email: new EmailControl(entity? entity.email : ''),
    password: new PasswordControl(entity? entity.password : ''),
    confirm: new PasswordControl(entity? entity.confirm : ''),
  }
}

function createValidators(validators?: any[]): ValidatorFn[]{
  if(validators && validators.length) {
    return validators;
  } else {
    return [checkPasswords()];
  }
}

export class SignupForm extends EntityRulesForm<SignUp> {
  constructor(data?: SignUp, validators?: any[]) {
    super(
      createControls(data),
      createValidators(validators),
    )
  }
}