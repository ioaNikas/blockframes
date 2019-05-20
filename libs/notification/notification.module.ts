import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ArraySortPipe } from '@blockframes/utils';

//Components
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';

//Material
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';
import { MatBadgeModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [ArraySortPipe, NotificationListComponent, NotificationItemComponent, NotificationMenuComponent,],
  imports: [
    CommonModule,
    RouterModule,

    //Material
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule,
    MatListModule,
  ],
  exports: [NotificationListComponent, NotificationMenuComponent,]
})
export class NotificationModule { }
