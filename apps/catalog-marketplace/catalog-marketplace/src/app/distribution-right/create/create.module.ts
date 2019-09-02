import { CatalogFormSelectionComponent } from './../selection-table/form-selection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatepickerModule, MonthCalendarModule } from '@blockframes/ui';
import { DistributionRightCreateComponent } from './create.component';

// Material
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [DistributionRightCreateComponent, CatalogFormSelectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatepickerModule,
    MonthCalendarModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,

    RouterModule.forChild([{ path: '', component: DistributionRightCreateComponent }])
  ]
})
export class DistributionRightCreateModule {}
