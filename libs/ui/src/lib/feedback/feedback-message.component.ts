import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FeedbackMessage } from './feedback-message.module';

@Component({
  selector: 'feedback-message',
  templateUrl: './feedback-message.component.html',
  styleUrls: ['./feedback-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackMessageComponent {
  /** The message which should be displayed when this component is called. */
  @Input() public message: FeedbackMessage;

  /** 
   * An event that notify the parent component that the user want to back
   * to his wallet or depending on the routerparams where he came from
   */
  @Output() public redirectUser = new EventEmitter();
}
