import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'blockframes-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
