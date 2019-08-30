import { FlexLayoutModule } from '@angular/flex-layout';
import { CatalogSelectionComponent } from './selection.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [CatalogSelectionComponent],
  imports: [
    FlexLayoutModule,
    MatDividerModule,

    RouterModule.forChild([
      {
        path: '',
        component: CatalogSelectionComponent
      }
    ])
  ]
})
export class SelectionModule {}
