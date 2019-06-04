import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MovieForm } from './movie.form';
import { FormGroup } from '@angular/forms';
import { MovieQuery, createMovie } from '../+state';
import { PersistNgFormPlugin } from '@datorama/akita';

@Component({
  selector: 'movie-form-test-section',
  templateUrl: './form.test.component.html',
  styleUrls: ['./form.test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTestComponent implements OnInit {

  public persistForm: PersistNgFormPlugin;

  constructor(
    public form: MovieForm,
    private query: MovieQuery,

  ) {
    
    //this.persistForm = new PersistNgFormPlugin(this.query, createMovie).setForm(form);
  }
 
  ngOnInit() {
   
  }


}
