import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { default as staticModels } from '../staticModels';

@Component({
  selector: 'movie-form-team-section',
  templateUrl: './form.team.component.html',
  styleUrls: ['./form.team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTeamComponent implements OnInit {
  
  @Input() movieForm: FormGroup;
  @Input() movieCredits: FormArray;
  @Input() removeFormControl: any;
  @Input() addFormControl: any;

  public staticModels: any;

  constructor(
    private builder: FormBuilder,
  ) {}

  ngOnInit() {
    this.staticModels = staticModels;
  }

  public addCredit(): void {
    const defaultFormGroup = { firstName: '', lastName: '', creditRole: ''};
    this.addFormControl(this.builder.group(defaultFormGroup), 'movieCredits');
  }

}
