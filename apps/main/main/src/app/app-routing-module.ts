// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LayoutComponent } from './layout/layout.component';

// Guards
import { AuthGuard } from '@blockframes/auth';
import { OrganizationHomeComponent, OrgFormComponent, OrganizationGuard, PermissionsGuard } from '@blockframes/organization';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'layout', redirectTo: '', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@blockframes/auth').then(m => m.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrganizationHomeComponent
      },
      {
        path: 'create',
        component: OrgFormComponent
      },
      {
        path: 'home',
        canActivate: [OrganizationGuard, PermissionsGuard],
        canDeactivate: [OrganizationGuard, PermissionsGuard],
        children: [
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'organization',
            loadChildren: () => import('@blockframes/organization').then(m => m.OrganizationModule)
          },
          {
            path: 'delivery',
            loadChildren: () => import('@blockframes/delivery').then(m => m.DeliveryModule)
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
    redirectTo: 'not-found'
  }
];

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
