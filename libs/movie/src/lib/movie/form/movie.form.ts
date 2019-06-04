import { AbstractFormControls, AbstractFormGroup, StringControl } from '@blockframes/ui';
import { Injectable } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';

export class MovieFormControls extends AbstractFormControls{

  constructor() {
    super();

    this.controls =  {
      originalTitle: new StringControl(''),
      internationalTitle: new StringControl(''),
      directorName: new StringControl(''),
      poster: new StringControl(''),
      productionYear: new StringControl(''),
      types:  new StringControl(''),
      genres:  new StringControl(''),
      originCountry:  new StringControl(''),
      coProducerCountries:  new StringControl(''),
      languages:  new StringControl(''),
      status:  new StringControl(''),
      logline:  new StringControl('', false, [Validators.maxLength(180)]),
      synopsis: new StringControl('', false, [Validators.maxLength(500)]),
      keywords: new FormArray([]),
      credits: new FormArray([]),
      images: new FormArray([]),
      promotionalElements: new FormArray([]),
    };
  }
}

@Injectable({ providedIn: 'root' })
export class MovieForm extends AbstractFormGroup {
  protected form : AbstractFormControls;

  constructor( ) {
    const f = new MovieFormControls();
    super(f.controls, f.validators);
    this.form = f;
  }
}
