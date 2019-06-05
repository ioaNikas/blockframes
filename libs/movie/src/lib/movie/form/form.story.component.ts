import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { MovieForm } from './movie.form';

@Component({
  selector: 'movie-form-story-section',
  templateUrl: './form.story.component.html',
  styleUrls: ['./form.story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormStoryComponent {

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public form: MovieForm) {}
}
