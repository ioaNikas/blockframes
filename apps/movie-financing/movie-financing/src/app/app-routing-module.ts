// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieActiveGuard } from '@blockframes/movie';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '@blockframes/auth';
import { PermissionsGuard, OrganizationGuard } from '@blockframes/organization';

// Movie Financing Sub App Routes
export const subMovieFinancingRoutes: Routes = [
  { path: '', redirectTo: 'movie', pathMatch: 'full' },
  {
    path: 'movie',
    loadChildren: () => import('@blockframes/movie').then(m => m.MovieModule)
  }
];

// Movie Financing App Routes
export const movieFinancingRoutes: Routes = [
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
            redirectTo: 'movie-financing',
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
            path: 'movie-financing',
            children: subMovieFinancingRoutes
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
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(movieFinancingRoutes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
