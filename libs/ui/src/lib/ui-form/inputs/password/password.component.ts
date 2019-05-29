import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordComponent  {

  @Input() form: FormGroup;
  @Input() showHint = true;
  @Input() name= 'pwd';
  @Input() placeholder = 'Password';
  @Input() matcher = false;
  
  constructor() {}
}
