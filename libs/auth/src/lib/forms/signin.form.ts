import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFormControls } from '@blockframes/ui';


export class SigninFormControls extends AbstractFormControls{

  constructor() {
    super();

    this.controls =  {
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', this.passwordValidators),
    };
  }
}

export class SigninForm extends FormGroup {
  protected form : AbstractFormControls;

  constructor(controls? : any, validators?: any ) {
    const f = new SigninFormControls();
    super(
      controls !== undefined ? controls : f.controls,
      validators !== undefined ? validators : f.validators
    );
    this.form = f;
  }

  public getRules (ruleName: string) {
    return this.form.rules[ruleName];
  }
}
