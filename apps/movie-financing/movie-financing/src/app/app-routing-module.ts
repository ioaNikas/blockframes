// Angular
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '@blockframes/auth';
import { PermissionsGuard, OrganizationGuard } from '@blockframes/organization';
import { authRoutes, commonRoutes, errorRoutes } from '@blockframes/routes';
import { FinancingExplorerHomeComponent } from './explorer/home/home.component';
import { FinancingExplorerSearchComponent } from './explorer/search/search.component';
import { FinancingExplorerDetailsComponent } from './explorer/details/details.component';
import { FinancingExplorerProfileComponent } from './explorer/profile/profile.component';
import { FinancingExplorerCompareComponent } from './explorer/compare/compare.component';

// Movie Financing Sub App Routes
export const subMovieFinancingRoutes: Routes = [
  { path: '', redirectTo: 'movie', pathMatch: 'full' },
  {
    path: 'movie',
    loadChildren: () => import('@blockframes/movie').then(m => m.MovieModule)
  },
  {
    path: 'explorer',
    component: FinancingExplorerHomeComponent,
    children : [
      {
        path: 'search',
        component: FinancingExplorerSearchComponent
      },
      {
        path: 'movie/:id',
        component: FinancingExplorerDetailsComponent
      },
    ]
  },
  {
    path: 'profile',
    component: FinancingExplorerProfileComponent
  },
  {
    path: 'compare',
    component: FinancingExplorerCompareComponent
  }
];

// Movie Financing App Routes
export const movieFinancingRoutes: Routes = [
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
            redirectTo: 'movie-financing',
            pathMatch: 'full'
          },
          ...commonRoutes,
          {
            path: 'movie-financing',
            children: subMovieFinancingRoutes,
            data: { app: 'movie-financing' }
          }
        ]
      },
      ...errorRoutes
    ]
  }
];

export class AppRoutingModule {}
