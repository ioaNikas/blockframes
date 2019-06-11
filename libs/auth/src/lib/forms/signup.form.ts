import { PasswordControl } from '@blockframes/ui';
import { SigninFormControls, SigninForm } from './signin.form';

export class SignupFormControls extends SigninFormControls{

  constructor() {
    super();
    const customPasswordFieldName = 'pwd'; // @todo use "password"
    this.controls.confirm = new PasswordControl('');
    this.validators.push(this.checkPasswords(customPasswordFieldName));
  }
}

export class SignupForm extends SigninForm {

  constructor(controls? : any, validators?: any ) {
    const f = new SignupFormControls();
    super(
      controls !== undefined ? controls : f.controls,
      validators !== undefined ? validators : f.validators
    );
    this.form = f;
  }
}
