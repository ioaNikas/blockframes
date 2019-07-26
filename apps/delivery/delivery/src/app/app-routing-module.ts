// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieActiveGuard } from '@blockframes/movie';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '@blockframes/auth';
import { PermissionsGuard, OrganizationGuard } from '@blockframes/organization';

// Delivery Sub App Routes
export const subDeliveryRoutes: Routes = [
  { path: '', redirectTo: 'movie', pathMatch: 'full' },
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

// Delivery App Routes
export const deliveryRoutes: Routes = [
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('@blockframes/auth').then(m => m.AuthModule)
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'o',
        pathMatch: 'full'
      },
      {
        path: 'organization',
        loadChildren: () => import('@blockframes/organization').then(m => m.NoOrganizationModule)
      },
      {
        path: 'o',
        canActivate: [PermissionsGuard, OrganizationGuard],
        canDeactivate: [PermissionsGuard, OrganizationGuard],
        children: [
          {
            path: '',
            redirectTo: 'delivery',
            pathMatch: 'full'
          },
          {
            path: 'account',
            loadChildren: () => import('@blockframes/account').then(m => m.AccountModule)
          },
          {
            path: 'organization',
            loadChildren: () => import('@blockframes/organization').then(m => m.OrganizationModule)
          },
          {
            path: 'delivery',
            children: subDeliveryRoutes
          },

        ]
      },
      {
        path: 'not-found',
        loadChildren: () => import('@blockframes/ui').then(m => m.ErrorNotFoundModule)
      },
      {
        path: '**',
        loadChildren: () => import('@blockframes/ui').then(m => m.ErrorNotFoundModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(deliveryRoutes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
