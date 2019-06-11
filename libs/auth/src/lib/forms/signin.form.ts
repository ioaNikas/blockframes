import { AbstractFormControls, EmailControl, PasswordControl, AbstractFormGroup } from '@blockframes/ui';

export class SigninFormControls extends AbstractFormControls{

  constructor() {
    super();

    this.controls =  {
      email: new EmailControl(''),
      pwd: new PasswordControl(''),
    };
  }
}

export class SigninForm extends AbstractFormGroup {
  protected form : AbstractFormControls;

  constructor(controls? : any, validators?: any ) {
    const f = new SigninFormControls();
    super(
      controls !== undefined ? controls : f.controls,
      validators !== undefined ? validators : f.validators
    );
    this.form = f;
  }
}
