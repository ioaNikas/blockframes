// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

// Components
import { LayoutComponent } from './layout/layout.component';

// Guards
import { AuthGuard } from '@blockframes/auth';
import { OrganizationGuard, PermissionsGuard } from '@blockframes/organization';
import { HomeComponent } from './home/home.component';

/**
 * Returns the base routes (with basic guards like auth/organization/permissions)
 * and takes children routes as an argument.
 * @param children must be an array of Route objects. Usually, we use app specific routes for this param.
 */
export const routeFactory = (...children: Route[]) => {
  return [
    {
      path: '',
      redirectTo: 'auth',
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
      // canDeactivate: [AuthGuard], // TODO: Fix the bug we're getting when trying to logout => ISSUE#670
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
            ...children,
            {
              path: 'account',
              loadChildren: () => import('@blockframes/account').then(m => m.AccountModule)
            },
            {
              path: 'organization',
              loadChildren: () =>
                import('@blockframes/organization').then(m => m.OrganizationModule)
            }
          ]
        }
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
  ];
};

/**
 * Main app specific routes. Use it to display main app home
 * and lazy-load applications submodules.
 */
export const routes = routeFactory(
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'delivery',
    loadChildren: () => import('@blockframes/delivery').then(m => m.DeliverySubModule)
  },
  {
    path: 'movie-financing',
    loadChildren: () => import('@blockframes/movie-financing').then(m => m.MovieFinancingAppModule)
  }
);

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
