import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { User, AuthQuery } from '@blockframes/auth';
import { NotificationQuery } from '../notification/+state';
import {
  InvitationQuery,
  InvitationStore,
  InvitationStatus,
  InvitationType,
  Invitation
} from '../invitation/+state';
import { switchMap, map } from 'rxjs/operators';
import { PermissionsQuery } from 'libs/organization/src/lib/permissions/+state/permissions.query';

@Component({
  selector: 'notification-widget',
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
  providers: [InvitationQuery, InvitationStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationWidgetComponent implements OnInit {
  public user$: Observable<User>;
  public notificationCount$: Observable<number>;
  public invitationCount$: Observable<number>;

  constructor(
    private authQuery: AuthQuery,
    private notificationQuery: NotificationQuery,
    private invitationQuery: InvitationQuery,
    private permissionQuery: PermissionsQuery
  ) {}

  ngOnInit() {
    this.user$ = this.authQuery.user$;
    this.notificationCount$ = this.notificationQuery.selectCount(notification => !notification.isRead);
    this.invitationCount$ = this.permissionQuery.isSuperAdmin$.pipe(
      switchMap(isSuperAdmin =>
        isSuperAdmin
          ? this.invitationQuery.selectCount(invitation => this.adminInvitations(invitation))
          : this.invitationQuery.selectCount(invitation => this.memberInvitations(invitation))
      )
    );
  }

  private adminInvitations(invitation: Invitation) {
    return (
      invitation.status === InvitationStatus.pending &&
      invitation.type !== InvitationType.fromOrganizationToUser
    );
  }

  private memberInvitations(invitation: Invitation) {
    return (
      invitation.status === InvitationStatus.pending &&
      invitation.type === InvitationType.toWorkOnDocument
    );
  }

  public get totalCount() {
    return combineLatest([this.invitationCount$, this.notificationCount$]).pipe(
      map(counts => counts[0] + counts[1])
    );
  }
}
