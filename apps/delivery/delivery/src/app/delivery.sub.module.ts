import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { subDeliveryRoutes } from './app-routing-module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(subDeliveryRoutes),
  ],
  declarations: [LayoutComponent]
})
export class DeliverySubModule {}
