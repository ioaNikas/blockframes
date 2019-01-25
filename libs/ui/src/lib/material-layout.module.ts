import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [MatToolbarModule, MatCardModule, MatListModule, MatSidenavModule]
})
export class MaterialLayoutModule {}
