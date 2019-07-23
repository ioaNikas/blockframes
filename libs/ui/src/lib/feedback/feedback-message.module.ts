import { NgModule } from '@angular/core';
import { FeedbackMessageComponent } from './feedback-message.component';

/** A message to display to the user at the end of a tunnel */
export interface FeedbackMessage {
  headline: string;
  subline: string;
  isError: boolean;
}

@NgModule({
  declarations: [FeedbackMessageComponent],
  imports: [],
  exports: [FeedbackMessageComponent],
})
export class FeedbackMessageModule { }
