import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'toolbar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() sidenav: MatSidenav

  constructor() {}
}
