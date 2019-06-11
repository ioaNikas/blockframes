import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFormControls, EmailControl } from '@blockframes/ui';


export class ProfilEditFormControls extends AbstractFormControls{

  constructor(user) {
    super();

    this.controls =  {
      uid: new FormControl({ value: user.uid, disabled: true }),
      email: new EmailControl(user.email, true),
      firstName: new FormControl(user.firstName, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      biography: new FormControl(user.biography),
    };
  }
}

export class ProfileForm extends FormGroup {
  protected form : AbstractFormControls;

  constructor(data?: any, controls? : any, validators?: any ) {
    const f = new ProfilEditFormControls(data);
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
