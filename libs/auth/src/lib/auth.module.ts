import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Fire
import { AngularFireAuthModule } from '@angular/fire/auth';

// Library
import { MaterialCommonModule, MaterialFormModule } from '@blockframes/ui';

// Component
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MaterialCommonModule,
    MaterialFormModule
  ],
  declarations: [LoginComponent, SignupComponent],
  exports: [LoginComponent, SignupComponent]
})
export class AuthModule {}
