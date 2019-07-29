import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { AuthQuery } from '@blockframes/auth';
import { IconComponent } from '@blockframes/ui';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private query: AuthQuery, private icon: IconComponent) {}
  // Remove IconComponent import and find a clean way to use icons => ISSUE#695

  @HostListener('window:beforeunload', ['$event'])
  closeProtection($event: any) {
    if (this.query.getValue().isEncrypting) {
      $event.returnValue =
        'Some critical data are still being processed and will be lost forever if you leave now !';
    }
  }
}
