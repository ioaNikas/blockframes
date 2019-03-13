import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { MovieGuard } from '@blockframes/movie';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'form', component: FormComponent },
  {
    path: 'form/:id',
    component: FormComponent,
    canActivate: [MovieGuard]
  },
  {
    path: 'movie/:id',
    component: ViewComponent,
    canActivate: [MovieGuard]
  },
]

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
