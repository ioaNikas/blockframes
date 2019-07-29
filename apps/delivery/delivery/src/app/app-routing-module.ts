// Angular
import { Routes } from '@angular/router';
import { MovieActiveGuard } from '@blockframes/movie';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '@blockframes/auth';
import { PermissionsGuard, OrganizationGuard } from '@blockframes/organization';
import { authRoutes, commonRoutes, errorRoutes } from '@blockframes/routes';

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
  ...authRoutes,
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
          ...commonRoutes,
          {
            path: 'delivery',
            children: subDeliveryRoutes,
            data: { app: 'delivery' },
          }
        ]
      },
      ...errorRoutes
    ]
  }
];

export class AppRoutingModule {}
