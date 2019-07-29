// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { App } from '@blockframes/organization';

// Components
import { HomeComponent } from './home/home.component';

// Guards
import { AuthGuard } from '@blockframes/auth';
import { PermissionsGuard, OrganizationGuard } from '@blockframes/organization';
import { authRoutes, commonRoutes, errorRoutes } from '@blockframes/routes';

export const mainRoutes: Routes = [
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
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            component: HomeComponent
          },
          ...commonRoutes,
          {
            path: 'delivery',
            loadChildren: () => import('@blockframes/delivery').then(m => m.DeliverySubModule),
            data: { app: App.mediaDelivering }
          },
          {
            path: 'movie-financing',
            loadChildren: () =>
              import('@blockframes/movie-financing').then(m => m.MovieFinancingSubModule),
            data: { app: App.mediaFinanciers }
          }
        ]
      },
      ...errorRoutes
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
