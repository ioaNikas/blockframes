import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

// Angular Fire
import { AngularFireAuthModule } from '@angular/fire/auth';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Component
import { AuthRootComponent } from './root/root.component';


export const AuthRoutes: Routes = [
  { path: '', component: AuthRootComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    // Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(AuthRoutes),
  ],
  declarations: [AuthRootComponent],
})
export class AuthModule {}
