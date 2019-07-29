import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { movieFinancingRoutes } from './app-routing-module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(movieFinancingRoutes)
  ],
  providers: [],
})
export class MovieFinancingAppModule {}
