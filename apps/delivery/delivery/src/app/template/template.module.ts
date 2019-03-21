// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { TemplateComponent } from './template/template.component';
import { TemplateListComponent } from './template-list/template-list.component';

// Material
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [TemplateComponent, TemplateListComponent,],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: TemplateComponent },
      { path: 'list', component: TemplateListComponent },
    ])
  ]
})
export class TemplateModule { }
