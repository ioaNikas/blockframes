import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatChipsModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
} from "@angular/material";

import { KeyManagerListComponent } from "./key-manager-list/key-manager-list.component";
import { KeyManagerItemComponent } from "./key-manager-item/key-manager-item.component";
import { EncryptingChipsComponent } from './encrypting-chips/encrypting-chips.component';
import { AskPasswordComponent } from './ask-password/ask-password.component';
import { RecoverComponent } from './recover/recover.component';
import { CreatePasswordComponent } from "./create-password/create-password.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
  ],
  declarations: [
    KeyManagerListComponent,
    KeyManagerItemComponent,
    EncryptingChipsComponent,
    AskPasswordComponent,
    CreatePasswordComponent,
    RecoverComponent,
  ],
  exports: [
    KeyManagerListComponent,
    EncryptingChipsComponent,
  ],
  entryComponents: [
    AskPasswordComponent,
    CreatePasswordComponent,
    RecoverComponent,
  ]
})
export class KeyManagerModule {}