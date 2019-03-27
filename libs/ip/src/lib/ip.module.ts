import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { AddComponent } from './add/add.component';

// Material

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

export const ipRoutes: Routes = [
  {
    path: '',
    component: ExplorerComponent,
    data: { org: null }
  },
  // @ todo { createComponent } ie simple create ip form that redirect to 
  // corresponding business module 
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // Material
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    RouterModule.forChild(ipRoutes),
  ],
  entryComponents: [ExplorerComponent, AddComponent],
  declarations: [ExplorerComponent, AddComponent],
  exports: [ExplorerComponent, AddComponent]
})
export class IpModule {}
