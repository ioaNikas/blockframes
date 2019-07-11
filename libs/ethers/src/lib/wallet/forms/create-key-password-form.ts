import {
  EntityControl,
  PasswordControl,
  FormEntity
} from '@blockframes/utils';

interface CreateKeyPassword {
  password: string
}
function createKeyPassword(params?: Partial<CreateKeyPassword>): CreateKeyPassword {
  return {
    password: '',
    ...(params || {})
  } as CreateKeyPassword
}

function createKeyPasswordControls(entity: Partial<CreateKeyPassword>): EntityControl<CreateKeyPassword> {
  const createPasswordKey = createKeyPassword(entity);
  return {
    password: new PasswordControl(createPasswordKey.password),
  }
}

type CreateKeyPasswordControl = ReturnType<typeof createKeyPasswordControls>;

export class CreateKeyPasswordForm extends FormEntity<CreateKeyPassword, CreateKeyPasswordControl> {
  constructor(data?: CreateKeyPassword) {
    super(
      createKeyPasswordControls(data)
    )
  }
}