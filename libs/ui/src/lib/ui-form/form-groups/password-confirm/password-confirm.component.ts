import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-group-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordConfirmComponent  {

  @Input() form: FormGroup;
  
  constructor() {}
}
