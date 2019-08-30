import { FlexLayoutModule } from '@angular/flex-layout';
import { CatalogSelectionComponent } from './selection.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CatalogSelectionComponent],
  imports: [
    FlexLayoutModule,

    RouterModule.forChild([
      {
        path: '',
        component: CatalogSelectionComponent
      }
    ])
  ]
})
export class SelectionModule {}
