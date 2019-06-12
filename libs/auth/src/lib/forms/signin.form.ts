import {
  EntityControl,
  EntityRulesForm,
  PasswordControl,
  EmailControl
} from '@blockframes/utils';

interface SignIn {
  email: string
  password: string
}

function createControls(entity?: SignIn): EntityControl<SignIn> {
  return {
    email: new EmailControl(entity? entity.email : ''),
    password: new PasswordControl(entity? entity.password : ''),
  }
}

export class SigninForm extends EntityRulesForm<SignIn> {
  constructor(data?: SignIn) {
    super(createControls(data))
  }
}