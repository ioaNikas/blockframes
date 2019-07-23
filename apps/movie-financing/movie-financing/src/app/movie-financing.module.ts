import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  { path: 'movies',
    loadChildren: () => import('@blockframes/movie').then(m => m.MovieModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class MovieFinancingAppModule {}
