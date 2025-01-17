import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Invitation } from '@blockframes/notification';

@Component({
  selector: 'member-pending',
  templateUrl: './member-pending.component.html',
  styleUrls: ['./member-pending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MemberPendingComponent {
  @Output() accepted = new EventEmitter<string>();
  @Output() declined = new EventEmitter<string>();
  @Input() invitations: Invitation[];
  @Input() isSuperAdmin: boolean;
}
