import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Component
import { LayoutComponent } from './layout/layout.component';

// Guard
import { AuthGuard } from '@blockframes/auth';
import { IpGuard } from '@blockframes/ip'

export const routes: Routes = [
  { 
    path:'',
    redirectTo: 'layout',
    pathMatch:'full'
  },
  {
    path: 'auth',
    loadChildren: '@blockframes/auth#AuthModule'
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: '',
        redirectTo: 'explorer',
        pathMatch: 'full'
      },
      {
        path: 'ip/:id',
        canActivate: [IpGuard],
        loadChildren: './business/business.module#BusinessModule'
      },
      {
        path: 'explorer',
        loadChildren: '@blockframes/ip#IpModule'
      },
      {
        path: 'organization',
        loadChildren: '@blockframes/organization#OrganizationModule'
      },
      {
        path: 'account',
        loadChildren: '@blockframes/account#AccountModule'
      }
    ]
  }
  // @todo bruce handle 404 errors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
