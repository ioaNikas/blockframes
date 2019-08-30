import { CatalogFormSelectionComponent } from './../selection-table/form-selection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatepickerModule, MonthCalendarModule } from '@blockframes/ui';
import { DistributionRightCreateComponent } from './create.component';

// Material
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material';
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
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDatepickerModule,
    MatListModule,
    RouterModule.forChild([{ path: '', component: DistributionRightCreateComponent }])
  ]
})
export class DistributionRightCreateModule {}
