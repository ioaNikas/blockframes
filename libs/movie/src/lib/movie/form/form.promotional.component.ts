import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MovieForm } from './movie.form';

@Component({
  selector: 'movie-form-promotional-section',
  templateUrl: './form.promotional.component.html',
  styleUrls: ['./form.promotional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPromotionalComponent {

  constructor(
    public form: MovieForm
  ) {}
}
