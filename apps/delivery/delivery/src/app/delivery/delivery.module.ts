import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MovieMaterialsComponent } from './movie-materials/movie-materials.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DeliveryGuard } from './delivery.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'movie-materials',
    component: MovieMaterialsComponent
  },
  {
    path: 'delivery-list',
    children: [
      { path: '', component: ListComponent },
      { path: ':id', canActivate: [DeliveryGuard], component: ViewComponent }
    ]
  }
];

@NgModule({
  declarations: [MovieMaterialsComponent, ListComponent, ViewComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    // Material
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,

    RouterModule.forChild(routes)]
})
export class DeliveryModule {}
