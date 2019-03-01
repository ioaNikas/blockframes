import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'form', component: FormComponent },
]

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
