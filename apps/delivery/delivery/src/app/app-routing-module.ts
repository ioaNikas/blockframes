// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LayoutComponent } from './layout/layout.component';
import { MovieMaterialsComponent } from './delivery/movie-materials/movie-materials.component';
import { HomeComponent } from './delivery/home/home.component';
import { ListComponent } from './delivery/list/list.component';
import { ViewComponent } from './delivery/view/view.component';

// Guards
import { MovieGuard } from '@blockframes/movie';

export const routes: Routes = [
  { path: '', redirectTo: 'delivery', pathMatch: 'full' },
  //{path: 'auth', loadChildren: '@blockframes/auth#AuthModule'},

  {
    path: 'delivery',
    component: LayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'explorer', pathMatch: 'full' },
      { path: 'explorer', loadChildren: 'libs/movie/src/lib/movie.module#MovieModule' },
      {
        path: 'organization',
        loadChildren: '@blockframes/organization#OrganizationModule'
      },
      {
        path: 'account',
        loadChildren: '@blockframes/account#AccountModule'
      },
      { path: 'explorer', loadChildren: '@blockframes/movie#MovieModule' },
      { path: 'template', loadChildren: './template/template.module#TemplateModule' },
      {
        path: ':id',
        canActivate: [MovieGuard],
        children: [
          { path: '', component: HomeComponent },
          { path: 'movie-materials', component: MovieMaterialsComponent },
          {
            path: 'delivery-list',
            component: ListComponent,
            children: [{ path: ':deliveryId', component: ViewComponent }]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
