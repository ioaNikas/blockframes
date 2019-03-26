// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { TemplateComponent } from './template/template.component';
import { TemplateListComponent } from './template-list/template-list.component';


@NgModule({
  declarations: [TemplateComponent, TemplateListComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TemplateComponent }
    ])
  ]
})
export class TemplateModule { }
