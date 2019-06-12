import {
  EntityControl,
  EntityRulesForm,
  PasswordControl,
  checkPasswords }
from '@blockframes/utils';
import { ValidatorFn } from '@angular/forms';

interface Create {
  password: string 
  confirm: string
}

function createControls(entity?: Create): EntityControl<Create> {
  return {
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

export class CreateForm extends EntityRulesForm<Create> {
  constructor(data?: Create, validators?: any[]) {
    super(
      createControls(data),
      createValidators(validators),
    )
  }
}

