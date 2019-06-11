import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { default as staticModels } from '../staticModels';
import { MovieForm } from './movie.form';

@Component({
  selector: 'movie-form-team-section',
  templateUrl: './form.team.component.html',
  styleUrls: ['./form.team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTeamComponent implements OnInit {

  public staticModels: any;

  constructor(
    private builder: FormBuilder,
    public form: MovieForm
  ) {}

  ngOnInit() {
    this.staticModels = staticModels;
  }

  public addCredit(): void {
    const defaultFormGroup = { firstName: '', lastName: '', creditRole: ''};
    this.form.addFormControl(this.builder.group(defaultFormGroup), 'movieCredits');
  }

}
