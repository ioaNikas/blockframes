import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {}
