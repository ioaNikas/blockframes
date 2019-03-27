import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Componnents
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

// Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Libraries
import { UiFormModule, UploadModule } from '@blockframes/ui';


export const businessRoutes: Routes = [
  {
    path: '',
    component: ViewComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    // Material
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    UiFormModule,
    UploadModule,
    ReactiveFormsModule,
    RouterModule.forChild(businessRoutes)
  ],
  entryComponents: [ViewComponent, EditComponent],
  declarations: [ViewComponent, EditComponent],
  exports: [ViewComponent, EditComponent]
})
export class BusinessModule { }