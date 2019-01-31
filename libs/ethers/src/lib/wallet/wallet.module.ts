import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [ViewComponent, FormComponent],
  exports: [ViewComponent, FormComponent],
})
export class WalletModule { }
