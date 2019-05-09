import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { default as staticModels } from '../staticModels';
import { startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Movie } from '../+state';

interface StaticModel {
  label: string;
  slug: string;
}

@Component({
  selector: 'movie-form-main-section',
  templateUrl: './form.main.component.html',
  styleUrls: ['./form.main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormMainComponent implements OnInit {
  
  @Input() movieForm: FormGroup;
  @Input() movie: Movie;
  @Input() currentFormValue: any;

  public staticModels: any;
  public countriesFilterCtrl: FormControl = new FormControl();
  public languagesFilterCtrl: FormControl = new FormControl();
  public genresFilterCtrl: FormControl = new FormControl();
  public audiovisualTypesFilterCtrl: FormControl = new FormControl();
  public countries$: Observable<StaticModel[]>;
  public languages$: Observable<StaticModel[]>;
  public genres$: Observable<StaticModel[]>;
  public audiovisualTypes$: Observable<StaticModel[]>;
  
  constructor() {}

  ngOnInit() {
    this.staticModels = staticModels;
    this._selectSearchSubScriptions();
  }

  /* Selects with search bar */
  private _selectSearchSubScriptions() : void {
    this.countries$ = this.filterSelectSearch(this.countriesFilterCtrl, this.staticModels['COUNTRIES']);
    this.languages$ = this.filterSelectSearch(this.languagesFilterCtrl, this.staticModels['LANGUAGES']);
    this.genres$ = this.filterSelectSearch(this.genresFilterCtrl, this.staticModels['GENRES']);
    this.audiovisualTypes$ = this.filterSelectSearch(this.audiovisualTypesFilterCtrl, this.staticModels['AUDIOVISUAL_TYPES']);
  }

  private filterSelectSearch(control: FormControl, model: StaticModel[]) {
    return control.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      map(name => model.filter(item => item.label.toLowerCase().indexOf(name.toLowerCase()) > -1))
    )
  }

  public setPoster(poster: string) {
    this.movieForm.patchValue({ poster });
  }

}
