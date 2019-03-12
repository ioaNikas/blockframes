import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MovieService, staticModels } from '@blockframes/movie';

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
      keywords: this.builder.array(['']),
      logline: ['', Validators.maxLength(180)],
      synopsis: [''],
      directorNote: [''],
      producerNote: [''],
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
