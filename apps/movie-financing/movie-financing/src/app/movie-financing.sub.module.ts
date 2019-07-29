import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { subMovieFinancingRoutes } from './app-routing-module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(subMovieFinancingRoutes)
  ],
  providers: [],
})
export class MovieFinancingSubModule {}
