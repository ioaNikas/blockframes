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


export const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
    canActivate: [MovieListGuard],
  },

  // MovieGuard: set active the Movie id in Akita

  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'form/:movieId',
    component: FormComponent,
    canActivate: [MovieGuard],
  },
  {
    path: 'form/:movieId/teamwork',
    component: StakeholderListComponent,
    canActivate: [MovieGuard],
  },
  {
    path: 'movie/:movieId',
    component: ViewComponent,
    canActivate: [MovieGuard],
  },
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
