import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MovieListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { TitleFormComponent } from './title-form/title-form.component';
import { StakeholderListComponent } from '../stakeholder/list/list.component';

// Guards
import { MovieGuard } from './guards/movie.guard';
import { MovieListGuard } from './guards/movie-list.guard';
import { MovieActiveGuard } from './guards/movie-active.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: MovieListComponent,
    canActivate: [MovieListGuard],
  },
  {
    path: ':movieId',
    canActivate: [MovieActiveGuard],
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ViewComponent },
      { path: 'form', component: FormComponent },
      { path: 'form/teamwork', component: StakeholderListComponent }
    ]
  },

  // {
  //   path: 'form',
  //   component: FormComponent,
  // },
  // {
  //   path: 'form/:movieId',
  //   component: FormComponent,
  //   canActivate: [MovieGuard],
  // },
  // {
  //   path: 'form/:movieId/teamwork',
  //   component: StakeholderListComponent,
  //   canActivate: [MovieGuard],
  // },
  // {
  //   path: 'movie/:movieId',
  //   component: ViewComponent,
  //   canActivate: [MovieGuard],
  // },
  {
    path: 'dev',
    component: TitleFormComponent,
  },
]

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class MovieRoutingModule { }
