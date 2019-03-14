import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';

// Guards
import { MovieGuard } from '@blockframes/movie';
import { AuthGuard } from '@blockframes/auth';


export const routes: Routes = [
  { path: '', component: HomeComponent },
    /*
  GUARDS
  AuthGuard: check if user signed in
  MovieGuard: set active the Movie id in Akita
  */
  {
    path: 'form',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: { fallback: '' },
  },
  {
    path: 'form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, MovieGuard],
    data: { fallback: '' },
  },
  {
    path: 'movie/:id',
    component: ViewComponent,
    canActivate: [AuthGuard, MovieGuard],
    data: { fallback: '' },
  },
]

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
