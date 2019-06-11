import { FormGroup } from '@angular/forms';
import { AbstractFormControls } from '@blockframes/ui';

export class AbstractFormGroup extends FormGroup {
  protected form : AbstractFormControls;

  public getRules (ruleName: string) {
    return this.form.rules[ruleName];
  }
}
