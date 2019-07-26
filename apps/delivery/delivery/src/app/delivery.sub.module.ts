import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieActiveGuard } from '@blockframes/movie';

export const deliveryRoutes: Routes = [
  { path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
  {
    path: 'movie',
    loadChildren: () => import('@blockframes/movie').then(m => m.MovieModule)
  },
  {
    path: 'template',
    loadChildren: () => import('@blockframes/template').then(m => m.TemplateModule)
  },
  {
    path: ':movieId',
    canActivate: [MovieActiveGuard],
    canDeactivate: [MovieActiveGuard],
    loadChildren: () => import('@blockframes/delivery-lib').then(m => m.DeliveryModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(deliveryRoutes)
  ],
  providers: [],
})
export class DeliverySubModule {}
