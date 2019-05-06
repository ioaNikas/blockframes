import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { default as staticModels } from '../staticModels';
import { takeWhile } from 'rxjs/operators';
import { Movie } from '../+state';

@Component({
  selector: 'movie-form-main-section',
  templateUrl: './form.main.component.html',
  styleUrls: ['./form.main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormMainComponent implements OnInit, OnDestroy {
  
  @Input() movieForm: FormGroup;
  @Input() movie: Movie;
  @Input() currentFormValue: any;

  public isAlive = true;
  public staticModels: any;
  public countriesFilterCtrl: FormControl = new FormControl();
  public languagesFilterCtrl: FormControl = new FormControl();
  public genresFilterCtrl: FormControl = new FormControl();
  public audiovisual_typesFilterCtrl: FormControl = new FormControl();
  public countries$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public languages$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public genres$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public audiovisual_types$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  
  constructor() {}

  ngOnInit() {
    this.staticModels = staticModels;
    this._selectSearchSubScriptions();
  }

  /* Selects with search bar */
  private _selectSearchSubScriptions() : void {
    
    this.countries$.next(staticModels.COUNTRIES.slice());
    this.countriesFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('COUNTRIES'));

    this.languages$.next(staticModels.LANGUAGES.slice());
    this.languagesFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('LANGUAGES'));

    this.genres$.next(staticModels.GENRES.slice());
    this.genresFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('GENRES'));

    this.audiovisual_types$.next(staticModels.AUDIOVISUAL_TYPES.slice());
    this.audiovisual_typesFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('AUDIOVISUAL_TYPES'));
  }

  private filterSelectSearch(model: string) {
    if (!staticModels[model]) { return; }

    let search = this[`${model.toLowerCase()}FilterCtrl`].value;
    if (!search) {
      this[`${model.toLowerCase()}$`].next(staticModels[model].slice());
      return;
    } else { search = search.toLowerCase(); }

    this[`${model.toLowerCase()}$`]
    .next(staticModels[model]
    .filter(i => i.label.toLowerCase().indexOf(search) > -1));
  }

  public addPoster(poster: string) {
    this.movieForm.patchValue({ poster });
  }

  public removePoster() {
    this.movieForm.patchValue({ poster : '' });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }


}
