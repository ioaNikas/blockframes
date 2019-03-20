// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { TemplateComponent } from './template/template.component';


@NgModule({
  declarations: [TemplateComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TemplateComponent }
    ])
  ]
})
export class TemplateModule { }
