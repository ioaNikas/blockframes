import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from '@blockframes/auth';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path:'', redirectTo: 'layout', pathMatch:'full' },
 // { path: 'auth', loadChildren: '' }, // loadChildren should lead to the Auth Module
  {
    path: 'layout',
    component: LayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'explorer', pathMatch: 'full' },
      { path: 'explorer', loadChildren: '@blockframes/movie#MovieModule' }, // loadChildren should lead to the Movie Module
     // { path: 'organization', loadChildren: '' }, // loadChildren should lead to the Organization Module
      //{ path: 'account', loadChildren: '' }, // loadChildren should lead to the Account Module
      { path: ':id', loadChildren: './financing/financing.module#FinancingModule' } // should lead to the specific App
    ]
  }
  // {path: '**', component: ErrorComponent}, //  should lead to the 404 Component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
