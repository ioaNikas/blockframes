import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MovieService, staticModels } from '@blockframes/movie';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'movie-financing-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  public staticModels: any;
  public credits: FormArray;
  public stakeholders: FormArray;
  public promotionalElements: FormArray;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public movieForm: FormGroup;

  constructor(
    private service: MovieService,
    private builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.staticModels = staticModels;
    this.movieForm = this.builder.group({
      title: ['', Validators.required],
      ipId: [''],
      credits: this.builder.array([ this.createCredit() ]),
      stakeholders: this.builder.array([ this.createStakeholder() ]),
      genres: [''],
      isan: [null],
      status: [''],
      poster: [''],
      types: [''],
      keywords: this.builder.array([ this.createKeyword('') ]),
      logline: ['', Validators.maxLength(180)],
      synopsis: ['', Validators.maxLength(500)],
      directorNote: ['', Validators.maxLength(1000)],
      producerNote: ['', Validators.maxLength(1000)],
      originCountry: [''],
      languages: [''],
      promotionalElements: this.builder.array([ this.createPromotionalElement() ]),
      goalBudget: [null],
      movieCurrency: [''],
      fundedBudget: [null],
      breakeven: [null],
      backendProfit: [null],
      potentialRevenues: [null],
      selectionCategories: ['']
    });
  }

  public onSubmit(){
    console.log(this.movieForm.value);
    this.service.add(this.movieForm.value);
    this.movieForm.reset();
  }

// CREDITS

  public get movieCredits() {
    return this.movieForm.get('credits') as FormArray;
  }

  public createCredit(): FormGroup {
    return this.builder.group({
      firstName: '',
      lastName: '',
      creditRole: '',
    });
  }

  public addCredit(): void {
    this.movieCredits.push(this.createCredit());
  }

  public removeCredit(index: number): void {
    this.movieCredits.removeAt(index);
  }

// STAKEHOLDERS

  public get movieStakeholders() {
    return this.movieForm.get('stakeholders') as FormArray;
  }

  public createStakeholder(): FormGroup {
    return this.builder.group({
      orgName: '',
      stakeholderRole: '',
    });
  }

  public addStakeholder(): void {
    this.movieStakeholders.push(this.createStakeholder());
  }

  public removeStakeholder(index: number): void {
    this.movieStakeholders.removeAt(index);
  }

// KEYWORDS

  public get keywords() {
    return this.movieForm.get('keywords') as FormArray;
  }

  public createKeyword(keywordName: string): FormGroup {
    return this.builder.group({name: keywordName});
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

// PROMOTIONAL ELEMENTS

  public createPromotionalElement(): FormGroup {
    return this.builder.group({
      promotionalElementName: '',
      url: '',
    });
  }

  public addPromotionalElement(): void {
    this.promotionalElements = this.movieForm.get('promotionalElements') as FormArray;
    this.promotionalElements.push(this.createPromotionalElement());
  }
}
