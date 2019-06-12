import { PasswordControl, EntityControl, EntityRulesForm } from '@blockframes/utils';

interface Password {
  password: string 
}

function createControls(entity?: Password): EntityControl<Password> {
  return {
    password: new PasswordControl(entity? entity.password : ''),
  }
}

export class PasswordForm extends EntityRulesForm<Password> {
  constructor(data?: Password) {
    super(createControls(data))
  }
}