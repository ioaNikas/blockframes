import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'account-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileWidgetComponent {
  constructor() {}
}
