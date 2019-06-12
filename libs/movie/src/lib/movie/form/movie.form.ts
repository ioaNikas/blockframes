import { EntityControl, EntityForm, StringControl, YearControl } from '@blockframes/utils';
import { Validators, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Injectable } from '@angular/core';

interface Movie {
  originalTitle: string
  internationalTitle: string
  directorName: string
  poster: string
  productionYear: string
  types: string
  genres: string
  originCountry: string
  coProducerCountries: string
  languages: string
  status: string
  logline: string
  synopsis:string
  keywords: any[],
  credits: any[],
  images: any[],
  promotionalElements: any[],
}

function createControls(): EntityControl<Movie> {
  return {
    originalTitle: new StringControl('', false, [Validators.required]),
    internationalTitle: new StringControl('', false, [Validators.required]),
    directorName: new StringControl('', false, [Validators.required]),
    poster: new StringControl(''),
    productionYear: new YearControl(''),
    types:  new StringControl(''),
    genres:  new StringControl(''),
    originCountry:  new StringControl(''),
    coProducerCountries:  new StringControl(''),
    languages:  new StringControl(''),
    status:  new StringControl('', false, [Validators.required]),
    logline:  new StringControl('', false, [Validators.maxLength(180)]),
    synopsis: new StringControl('', false, [Validators.maxLength(500)]),
    keywords: new FormArray([]),
    credits: new FormArray([]),
    images: new FormArray([]),
    promotionalElements: new FormArray([]),
  }
}

@Injectable({ providedIn: 'root' })
export class MovieForm extends EntityForm<Movie> {
  protected builder : FormBuilder;
  constructor() {
    super(createControls());
    this.builder = new FormBuilder;
  }

  //////////
  // GETTERS 
  //////////

  /* Getters for all form inputs */
  public currentFormValue(attr: string, index?: number) {
    if (index !== undefined) {
      const formArray = this.get(attr) as FormArray;
      return formArray.controls[index] !== null ? formArray.controls[index].value : '' as String;
    } else {
      const input = this.get(attr);
      return input !== null ? input.value: '' as String;
    }
  }

  public get keywords() {
    return this.get('keywords') as FormArray;
  }

  public get movieCredits() {
    return this.get('credits') as FormArray;
  }

  public get promotionalElements() {
    return this.get('promotionalElements') as FormArray;
  }

  public get images() {
    return this.get('images') as FormArray;
  }

  //////////
  // UTILS 
  //////////

  public populate(movie) {

    // Common fields
    this.get('originalTitle').setValue(movie.title.original);
    this.get('internationalTitle').setValue(movie.title.international);
    this.get('directorName').setValue(movie.directorName);
    this.get('poster').setValue(movie.poster);
    this.get('productionYear').setValue(movie.productionYear);
    this.get('types').setValue(movie.types);
    this.get('genres').setValue(movie.genres);
    this.get('originCountry').setValue(movie.originCountry);
    this.get('coProducerCountries').setValue(movie.coProducerCountries);
    this.get('languages').setValue(movie.languages);
    this.get('status').setValue(movie.status);
    this.get('logline').setValue(movie.logline);
    this.get('synopsis').setValue(movie.synopsis);

    // Populate custom fields
    if (movie.keywords && movie.keywords.length) {
      movie.keywords.forEach((keyword) => {
        this.addFormControl(new FormControl(keyword), 'keywords');
      })
    }

    if (movie.credits && movie.credits.length) {
      movie.credits.forEach((credit) => {
        this.addFormControl(this.builder.group(credit), 'movieCredits');
      })
    }

    if (movie.images && movie.images.length) {
      movie.images.forEach((image) => {
        this.addFormControl(new FormControl(image), 'images');
      })
    }

    if (movie.promotionalElements && movie.promotionalElements.length) {
      movie.promotionalElements.forEach((element) => {
        this.addFormControl(this.builder.group(element), 'promotionalElements');
      })
    }
  }

  public addFormControl(value: FormControl | FormGroup, key: string): void {
    this[key].push(value);
  }

  public removeFormControl(index: number, key: string): void {
    this[key].removeAt(index);
  }

  public setPoster(poster: string) {
    this.patchValue({ poster });
  }

  public setImage(image: string, index: number): void {
    this.images.controls[index].setValue(image);
  }

  public addImage(): void {
    this.addFormControl(new FormControl(''), 'images');
  }

  public addPromotionalElement(): void {
    const defaultFormGroup = { label: '', url: ''};
    this.addFormControl(this.builder.group(defaultFormGroup), 'promotionalElements');
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
}