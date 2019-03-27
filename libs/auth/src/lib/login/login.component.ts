import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersistNgFormPlugin } from '@datorama/akita';
import { UserForm, AuthQuery, AuthService, User } from '../+state';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public persistForm: PersistNgFormPlugin<UserForm>;
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private query: AuthQuery,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
    this.persistForm = new PersistNgFormPlugin(this.query, 'form');
    this.persistForm.setForm(this.form);
  }

  public async signin() {
    try {
      const { email, pwd } = this.form.value;
      await this.service.signin(email, pwd);

      // redirect to home only when user is actually connected
      // without that, we cannot pass the home guards
      this.query.user$()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((user: User) => {
        if (user !== null) {
          this.router.navigate(['']);
          this.snackBar.open('Login successful!', 'close', { duration: 2000 });
        }
      });

    } catch (err) {
      this.snackBar.open(err.message, 'close', { duration: 2000 });
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.persistForm.destroy();
  }
}