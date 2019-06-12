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

function createRecover(params?: Partial<Recover>): Recover {
  return {
    privateKey: '',
    mnemonic: '',
    password: '',
    confirm: '',
    ...(params || {})
  } as Recover
}

function createRecoverControls(entity: Partial<Recover>): EntityControl<Recover> {
  const recover = createRecover(entity);
  return {
    privateKey: new PrivateKeyControl(recover.privateKey),
    mnemonic: new MnemonicControl(recover.mnemonic),
    password: new PasswordControl(recover.password),
    confirm: new PasswordControl(recover.confirm),
  }
}

function createRecoverValidators(validators?: any[]): ValidatorFn[]{
  if(validators && validators.length) {
    return validators;
  } else {
    return [checkPasswords(), requireMnemonicXorPrivateKey];
  }
}

export class RecoverForm extends EntityRulesForm<Recover> {
  constructor(data?: Recover, validators?: any[]) {
    super(
      createRecoverControls(data),
      createRecoverValidators(validators),
    )
  }
}