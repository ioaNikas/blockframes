// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { TemplateComponent } from './template/template.component';
import { TemplateListComponent, AddTemplateDialog } from './template-list/template-list.component';

// Material
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatInputModule, MatMenuModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { TemplateFormComponent } from './template-form/template-form.component';



@NgModule({
  declarations: [TemplateComponent, TemplateListComponent, AddTemplateDialog, TemplateFormComponent,],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule.forChild([
      { path: '', component: TemplateComponent },
      { path: 'list', component: TemplateListComponent },
      { path: ':templateId', component: TemplateFormComponent },
    ])
  ],
  entryComponents: [AddTemplateDialog,],
})
export class TemplateModule { }
