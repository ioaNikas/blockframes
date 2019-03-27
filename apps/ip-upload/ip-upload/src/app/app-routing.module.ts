import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Component
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

// Guard
import { AuthGuard } from '@blockframes/auth';
import { IpResolver } from '@blockframes/ip';

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
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { fallback: '' },
      },
      {
        path: 'form/:id',
        component: FormComponent,
        canActivate: [AuthGuard],
        data: { fallback: '' },
        resolve: {
          ip: IpResolver
        }
      },
      {
        path: 'form',
        component: FormComponent,
        canActivate: [AuthGuard],
        data: { fallback: '', ip: null }
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
