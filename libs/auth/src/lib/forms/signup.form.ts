import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepeatPasswordStateMatcher, AbstractFormControls } from '@blockframes/ui';
import { SigninFormControls, SigninForm } from './signin.form';

export class SignupFormControls extends SigninFormControls{

  constructor() {
    super();
    this.passwordsMatcher = new RepeatPasswordStateMatcher('pwd', 'confirm');
    this.controls.confirm = new FormControl('', Validators.required);
    this.validators.push(this.checkPasswords);
  }

  private checkPasswords(group: FormGroup) {
    return group.controls.pwd.value === group.controls.confirm.value ? null : { passwordsNotMatching: true }     
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

  public getPasswordMatcher() {
    return this.form.passwordsMatcher;
  }
}
