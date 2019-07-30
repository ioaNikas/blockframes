import { NgModule } from '@angular/core';
import { FeedbackMessageComponent } from './feedback-message.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [FeedbackMessageComponent],
  imports: [
    MatButtonModule,
  ],
  exports: [FeedbackMessageComponent],
})
export class FeedbackMessageModule { }
