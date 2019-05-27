import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User, AuthQuery } from "@blockframes/auth";
import { NotificationQuery } from "../+state";

@Component({
  selector: 'notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationMenuComponent implements OnInit {

  public user$: Observable<User>;
  public notificationsCount$: Observable<number>;
  
  constructor(
    private auth: AuthQuery,
    private notificationQuery: NotificationQuery,
  ){}

  ngOnInit(){
    this.user$ = this.auth.user$;
    this.notificationsCount$ = this.notificationQuery.selectCount(entity => !entity.isRead);
  }
}