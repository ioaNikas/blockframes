import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService, AuthQuery } from '../+state';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'auth-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AuthRootComponent implements OnInit {
  public signinForm: FormGroup;
  public signupForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private query: AuthQuery,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.signinForm = this.builder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
    this.signupForm = this.builder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  public async signin() {
    if (this.signinForm.invalid) {
      this.snackBar.open('Information not valid');
      return;
    }
    try {
      const { email, pwd } = this.signinForm.value;
      await this.service.signin(email, pwd);
      const route = this.query.requestedRoute || 'layout';
      this.router.navigate([route]);
    } catch (err) {
      this.snackBar.open(err.message, 'close', { duration: 2000 });
    }
  }

  public async signup() {
    if (this.signinForm.invalid) {
      this.snackBar.open('Information not valid');
      return;
    }
    try {
      const { email, pwd } = this.signupForm.value;
      await this.service.signup(email, pwd);
      const route = this.query.requestedRoute || 'layout';
      this.router.navigate([route]);
    } catch (err) {
      this.snackBar.open(err.message, 'close', { duration: 2000 });
    }
  }
}
