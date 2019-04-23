import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createMovie, Movie, MovieQuery, MovieService } from '../+state';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { PersistNgFormPlugin } from '@datorama/akita';
import { Router } from '@angular/router';
import { default as staticModels, getLabelBySlug } from '../staticModels';

@Component({
  selector: 'movie-financing-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  public staticModels: any;
  public persistForm: PersistNgFormPlugin;
  public movieForm: FormGroup;
  public movie: Movie;
  public fullScreen = false;

  // @todo to check 
  public credits: FormArray;
  public stakeholders: FormArray;
  public promotionalElements: FormArray;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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

      ipId: [''],
      credits: this.builder.array([this.createCredit()]),
      stakeholders: this.builder.array([this.createStakeholder()]),
      isan: [null],
      keywords: this.builder.array([this.createKeyword('')]),
      logline: ['', Validators.maxLength(180)],
      synopsis: ['', Validators.maxLength(500)],
      directorNote: ['', Validators.maxLength(1000)],
      producerNote: ['', Validators.maxLength(1000)],
      promotionalElements: this.builder.array([this.createPromotionalElement()]),
      goalBudget: [null],
      movieCurrency: [''],
      fundedBudget: [null],
      breakeven: [null],
      backendProfit: [null],
      potentialRevenues: [null],
      selectionCategories: [''],
    });
    
    // Akita Persist Form 
    this.persistForm = new PersistNgFormPlugin(this.query, createMovie).setForm(this.movieForm);
  }

  /* Getters for all form inputs */
  public currentFormValue(attr: string) {
    const input = this.movieForm.get(attr);
    return input !== null ? input.value: '' as String;
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

  public addPoster(poster: string) {
    this.movieForm.patchValue({ poster });
  }

  public removePoster() {
    this.movieForm.patchValue({ poster : '' });
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

  ngOnDestroy() {
    this.clear();
    this.persistForm.destroy();
  }






  /*  TO CLEAN */

  public get movieCredits() {
    return this.movieForm.get('credits') as FormArray;
  }

  public get movieStakeholders() {
    return this.movieForm.get('stakeholders') as FormArray;
  }

  public get keywords() {
    return this.movieForm.get('keywords') as FormArray;
  }


  public createCredit(): FormGroup {
    return this.builder.group({
      firstName: '',
      lastName: '',
      creditRole: ''
    });
  }

// STAKEHOLDERS

  public addCredit(): void {
    this.movieCredits.push(this.createCredit());
  }

  public removeCredit(index: number): void {
    this.movieCredits.removeAt(index);
  }

  public createStakeholder(orgId?: string, orgName?: string, orgMovieRole?: string, stakeholderRole?: string, stakeholderAuthorization?: string): FormGroup {
    return this.builder.group({
      orgId: orgId || '',
      orgName: orgName || '',
      orgMovieRole: orgMovieRole || '',
      stakeholderRole: stakeholderRole || '',
      stakeholderAuthorization: stakeholderAuthorization || ''
    });
  }

  public addStakeholder(orgId: string, orgName: string, orgMovieRole: string, stakeholderRole: string, stakeholderAuthorization: string): void {
    this.movieStakeholders.push(this.createStakeholder(orgId, orgName, orgMovieRole, stakeholderRole, stakeholderAuthorization));
  }

// KEYWORDS

  public removeStakeholder(index: number): void {
    this.movieStakeholders.removeAt(index);
  }

  public createKeyword(keywordName: string): FormGroup {
    return this.builder.group({ name: keywordName });
  }

  public addKeyword(keywordName: string): void {
    this.keywords.push(this.createKeyword(keywordName));
  }

  public addChipKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add keyword
    if ((value || '').trim()) {
      this.addKeyword(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public remove(index: number): void {
    this.keywords.removeAt(index);
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
