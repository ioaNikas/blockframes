import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatMenuModule,
} from '@angular/material';

import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileDeleteComponent } from './profile-delete/profile-delete.component';
import { ProfileWidgetComponent } from './profile-widget/profile-widget.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

export const profileRoutes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: ProfileViewComponent },
  { path: 'edit', component: ProfileEditComponent },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule.forChild(profileRoutes),
  ],
  declarations: [
    ProfileViewComponent,
    ProfileEditComponent,
    ProfileDeleteComponent,
    ProfileWidgetComponent,
    ProfileMenuComponent,
  ],
  exports: [
    ProfileViewComponent,
    ProfileEditComponent,
    ProfileDeleteComponent,
    ProfileWidgetComponent,
    ProfileMenuComponent,
  ],
})
export class ProfileModule {}
