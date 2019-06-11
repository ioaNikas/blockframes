import { AbstractFormControls, PasswordControl, AbstractFormGroup } from '@blockframes/ui';

export class PasswordFormControls extends AbstractFormControls{

  constructor() {
    super();

    this.controls =  {
      password: new PasswordControl(''),
    };
  }
}

export class PasswordForm extends AbstractFormGroup {
  protected form : AbstractFormControls;

  constructor(controls? : any, validators?: any ) {
    const f = new PasswordFormControls();
    super(
      controls !== undefined ? controls : f.controls,
      validators !== undefined ? validators : f.validators
    );
    this.form = f;
  }
}
