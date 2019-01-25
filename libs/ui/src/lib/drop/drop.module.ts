import { NgModule } from '@angular/core';
import { DropZoneDirective } from './drop-zone.directive';

@NgModule({
  declarations: [DropZoneDirective],
  exports: [DropZoneDirective]
})
export class DropModule {}
