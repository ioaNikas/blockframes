import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { subDeliveryRoutes } from './app-routing-module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(subDeliveryRoutes)
  ],
  providers: [],
})
export class DeliverySubModule {}
