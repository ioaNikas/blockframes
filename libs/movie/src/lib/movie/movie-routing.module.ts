import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ContainerComponent } from './form/container.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { TitleFormComponent } from './title-form/title-form.component';
import { StakeholderListComponent } from '../stakeholder/list/list.component';

// Guards
import { MovieGuard } from './guards/movie.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },

  // MovieGuard: set active the Movie id in Akita

  {
    path: 'form',
    component: ContainerComponent,
  },
  {
    path: 'form/:movieId',
    component: ContainerComponent,
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
