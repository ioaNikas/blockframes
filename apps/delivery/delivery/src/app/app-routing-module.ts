// Angular
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Components
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {path: '', redirectTo: "layout", pathMatch: 'full'},
  //{path: 'auth', loadChildren: '@blockframes/auth#AuthModule'},
  {
    path: 'layout', component: LayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'explorer', pathMatch: 'full'},
      // { path: 'explorer', loadChildren: '@blockframes/movie#MovieModule' },
      // { path: 'account', loadChildren: '@blockframes/account#AccountModule' },
      // { path: 'organization', loadChildren: '@blockframes/organization#OrganizationModule' },
      { path: 'template', loadChildren: './template/template.module#TemplateModule' },
      { path: ':movieId', children: [
        { path: 'delivery', loadChildren: './delivery/delivery.module#DeliveryModule'},
      ] },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
