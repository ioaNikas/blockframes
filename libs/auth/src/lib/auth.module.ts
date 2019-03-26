import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

// Angular Fire
import { AngularFireAuthModule } from '@angular/fire/auth';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Component
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material';


export const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { fallback: '', org: null }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { fallback: '', org: null }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    // Material
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forChild(AuthRoutes),
  ],
  entryComponents: [SignupComponent, LoginComponent],
  declarations: [SignupComponent, LoginComponent],
  exports: [SignupComponent, LoginComponent],
})
export class AuthModule {}
