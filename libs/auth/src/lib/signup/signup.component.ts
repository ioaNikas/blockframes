import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersistNgFormPlugin } from '@datorama/akita';
import { UserForm, AuthQuery, AuthService } from '../+state';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public persistForm: PersistNgFormPlugin<UserForm>;

  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
    private builder: FormBuilder,
    private service: AuthService,
    private query: AuthQuery
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
    this.persistForm = new PersistNgFormPlugin(this.query, 'form');
    this.persistForm.setForm(this.form);
  }

  ngOnDestroy() {
    this.persistForm.destroy();
  }

  public async signin() {
    try {
      const { email, pwd } = this.form.value;
      await this.service.signin(email, pwd);
      this.dialogRef.close();
    } catch (err) {
      console.error(err);
    }
  }

  public async signup() {
    try {
      const { email, pwd } = this.form.value;
      await this.service.signup(email, pwd);
      this.dialogRef.close();
    } catch (err) {
      console.error(err);
    }
  }
}
