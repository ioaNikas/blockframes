import {
  PasswordControl,
  checkPasswords,
  requireMnemonicXorPrivateKey,
  PrivateKeyControl,
  MnemonicControl,
  EntityControl,
  EntityRulesForm
} from '@blockframes/utils';
import { ValidatorFn } from '@angular/forms';

interface Recover {
  privateKey: string
  mnemonic: string
  password: string 
  confirm: string
}

function createControls(entity?: Recover): EntityControl<Recover> {
  return {
    privateKey: new PrivateKeyControl(entity? entity.privateKey : ''),
    mnemonic: new MnemonicControl(entity? entity.mnemonic : ''),
    password: new PasswordControl(entity? entity.password : ''),
    confirm: new PasswordControl(entity? entity.confirm : ''),
  }
}

function createValidators(validators?: any[]): ValidatorFn[]{
  if(validators && validators.length) {
    return validators;
  } else {
    return [checkPasswords(), requireMnemonicXorPrivateKey];
  }
}

export class RecoverForm extends EntityRulesForm<Recover> {
  constructor(data?: Recover, validators?: any[]) {
    super(
      createControls(data),
      createValidators(validators),
    )
  }
}