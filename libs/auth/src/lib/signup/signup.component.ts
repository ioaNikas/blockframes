import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }
}
