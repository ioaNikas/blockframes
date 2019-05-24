import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import {
  MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatIconModule,
} from "@angular/material";

import { KeyManagerListComponent } from "./key-manager-list/key-manager-list.component";
import { KeyManagerItemComponent } from "./key-manager-item/key-manager-item.component";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [
    KeyManagerListComponent,
    KeyManagerItemComponent,
  ],
  exports: [
    KeyManagerListComponent,
  ]
})
export class KeyManagerModule {}
