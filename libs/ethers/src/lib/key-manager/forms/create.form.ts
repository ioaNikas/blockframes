import { AbstractFormControls, PasswordControl, AbstractFormGroup } from '@blockframes/ui';

export class CreateFormControls extends AbstractFormControls{

  constructor() {
    super();

    this.controls =  {
      password: new PasswordControl(''),
      confirm: new PasswordControl(''),
    };

    this.validators.push(this.checkPasswords());
  }
}

export class CreateForm extends AbstractFormGroup {
  protected form : AbstractFormControls;

  constructor(controls? : any, validators?: any ) {
    const f = new CreateFormControls();
    super(
      controls !== undefined ? controls : f.controls,
      validators !== undefined ? validators : f.validators
    );
    this.form = f;
  }
}
