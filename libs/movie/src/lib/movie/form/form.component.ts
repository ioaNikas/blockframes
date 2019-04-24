import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { createMovie, Movie, MovieQuery, MovieService } from '../+state';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { PersistNgFormPlugin } from '@datorama/akita';
import { Router } from '@angular/router';
import { default as staticModels, getLabelBySlug } from '../staticModels';
import { ReplaySubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'movie-financing-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  public isAlive = true;
  public staticModels: any;
  public persistForm: PersistNgFormPlugin;
  public movieForm: FormGroup;
  public movie: Movie;
  public fullScreen = false;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public countriesFilterCtrl: FormControl = new FormControl();
  public languagesFilterCtrl: FormControl = new FormControl();
  public genresFilterCtrl: FormControl = new FormControl();
  public audiovisual_typesFilterCtrl: FormControl = new FormControl();
  public countries: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public languages: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public genres: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public audiovisual_types: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  // @todo
  public promotionalElements: FormArray;

  constructor(
    private query: MovieQuery,
    private service: MovieService,
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.staticModels = staticModels;
    this.movie = this.query.getActive();

    this.movieForm = this.builder.group({
      originalTitle: [this.movie.title.original],
      internationalTitle: [this.movie.title.international],
      directorName: [this.movie.directorName],
      poster: [this.movie.poster],
      productionYear: [this.movie.productionYear],
      types: [this.movie.types],
      genres: [this.movie.genres],
      originCountry: [this.movie.originCountry],
      coProducerCountries: [this.movie.coProducerCountries],
      languages: [this.movie.languages],
      status: [this.movie.status],
      logline: [this.movie.logline, Validators.maxLength(180)],
      synopsis: [this.movie.synopsis, Validators.maxLength(500)],
      keywords: this.builder.array([]),
      credits: this.builder.array([]),

      promotionalElements: this.builder.array([this.createPromotionalElement()]),
      // other promo element
    });
    
    // Akita Persist Form 
    this.persistForm = new PersistNgFormPlugin(this.query, createMovie).setForm(this.movieForm);

    // Populate custom fields
    if (this.movie.keywords.length) {
      this.movie.keywords.forEach((keyword) => {
        this.addFormControl(new FormControl(keyword), 'keywords');
      })
    }

    if (this.movie.credits.length) {
      this.movie.credits.forEach((credit) => {
        this.addFormControl(this.builder.group(credit), 'movieCredits');
      })
    }

    this._selectSearchSubScriptions();
  }

  /* Selects with search bar */
  private _selectSearchSubScriptions() : void {
    
    this.countries.next(staticModels.COUNTRIES.slice());
    this.countriesFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('COUNTRIES'));

    this.languages.next(staticModels.LANGUAGES.slice());
    this.languagesFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('LANGUAGES'));

    this.genres.next(staticModels.GENRES.slice());
    this.genresFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('GENRES'));

    this.audiovisual_types.next(staticModels.AUDIOVISUAL_TYPES.slice());
    this.audiovisual_typesFilterCtrl.valueChanges
    .pipe(takeWhile(() => this.isAlive))
    .subscribe(() => this.filterSelectSearch('AUDIOVISUAL_TYPES'));
  }

  /* Getters for all form inputs */
  public currentFormValue(attr: string) {
    const input = this.movieForm.get(attr);
    return input !== null ? input.value: '' as String;
  }

  public get keywords() {
    return this.movieForm.get('keywords') as FormArray;
  }

  public get movieCredits() {
    return this.movieForm.get('credits') as FormArray;
  }

  /* Returns label from json staticModels */
  public getStaticBySlug (scope: string, slug: string) {
    return getLabelBySlug (scope, slug) as string;
  }

  /* Saves the form */
  public submit() {
    if (!this.movieForm.valid) {
      this.snackBar.open('form invalid', 'close', { duration: 2000 });
      throw new Error('Invalid form');
    } else {
      this.snackBar.open(`${this.movieForm.get('originalTitle').value} saved.`, 'close', { duration: 2000 });
      this.service.update(this.query.getActiveId(), this.preUpdate({ ...this.movieForm.value }));
    }
  }

  /* Applies movie modifications to fit actual model */
  private preUpdate(movie: any) {
    movie.title = {};
    if (movie.originalTitle) {
      movie.title.original = movie.originalTitle;
    }

    if (movie.internationalTitle) {
      movie.title.international = movie.internationalTitle;
    }
    delete movie.originalTitle;
    delete movie.internationalTitle;

    return movie;
  }

  private clear() {
    this.persistForm.reset();
    this.movieForm.reset();
  }

  public cancel() {
    this.clear();
    this.router.navigateByUrl('');
  }

  public toggleFullScreen() {
    return this.fullScreen ? this.fullScreen = false : this.fullScreen = true;
  }

  public addChip(event: MatChipInputEvent, object: string): void {
    const input = event.input;
    const value = event.value;

    // Add keyword
    if ((value || '').trim()) {
      this.addFormControl(new FormControl(value.trim()), object);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public addCredit(): void {
    const defaultFormGroup = { firstName: '', lastName: '', creditRole: ''};
    this.addFormControl(this.builder.group(defaultFormGroup), 'movieCredits');
  }

  public addPoster(poster: string) {
    this.movieForm.patchValue({ poster });
  }

  private addFormControl(value: FormControl | FormGroup, object: string): void {
    this[object].push(value);
  }

  public removeFormControl(index: number, object: string): void {
    this[object].removeAt(index);
  }

  public removePoster() {
    this.movieForm.patchValue({ poster : '' });
  }

  private filterSelectSearch(model: string) {
    if (!staticModels[model]) { return; }

    let search = this[`${model.toLowerCase()}FilterCtrl`].value;
    if (!search) {
      this[model.toLowerCase()].next(staticModels[model].slice());
      return;
    } else { search = search.toLowerCase(); }

    this[model.toLowerCase()]
    .next(staticModels[model]
    .filter(i => i.label.toLowerCase().indexOf(search) > -1));
  }

  ngOnDestroy() {
    this.clear();
    this.persistForm.destroy();
    this.isAlive = false;
  }





// PROMOTIONAL ELEMENTS: not implemented yet

  public createPromotionalElement(): FormGroup {
    return this.builder.group({
      promotionalElementName: '',
      url: ''
    });
  }

  public addPromotionalElement(): void {
    this.promotionalElements = this.movieForm.get('promotionalElements') as FormArray;
    this.promotionalElements.push(this.createPromotionalElement());
  }
}
