// Angular
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { ErrorStateMatcher, MatAccordion } from '@angular/material';
import { Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, ChangeDetectionStrategy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Blockframes
import { Movie } from '@blockframes/movie';
import { FireQuery } from '@blockframes/utils';
import {
  GenresLabel,
  GENRESLABEL,
  LANGUAGESLABEL,
  LanguagesLabel,
  CertificationsLabel,
  MediasLabel,
  TerritoriesLabel,
  CERTIFICATIONSLABEL,
  MEDIASLABEL,
  TERRITORIESLABEL
} from '@blockframes/movie/movie/static-model/types';
// RxJs
import { Observable, combineLatest } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
// Others
import { CatalogSearchForm } from './search.form';
import { languageValidator } from './search-validators.form';
import { filterMovie } from './filter.util';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'catalog-movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceSearchComponent implements OnInit {
  /* Observable of all movies */
  public movieSearchResults$: Observable<Movie[]>;

  /* Instance of the search form */
  public filterForm = new CatalogSearchForm();

  /* Array of sorting options */
  public sortOptions: string[] = ['All films', 'Title', 'Director', 'Production Year'];

  /* Flag to indicate either the movies should be presented as a card or a list */
  public listView: boolean;

  // TODO#748: split up into compoennts
  public movieGenres: GenresLabel[];
  public movieLanguages: LanguagesLabel[];
  public languageControl = new FormControl('', [Validators.required, languageValidator]);
  public languagesFilter: Observable<string[]>;
  public movieCertifications: CertificationsLabel[];
  public movieMedias: MediasLabel[];
  // Observables on the languages selected
  public languages$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    map(({ languages }) => Object.keys(languages))
  );
  public matcher = new MyErrorStateMatcher();

  @ViewChild('territoryInput', { static: false }) territoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;

  /** Section for chip input */
  public visible = true;
  public selectable = true;
  public removable = true;
  public selectedMovieTerritories: string[] = [];
  public territoriesFilter: Observable<string[]>;
  public movieTerritories: TerritoriesLabel[];
  public territoryControl: FormControl = new FormControl();

  constructor(private fireQuery: FireQuery, private router: Router) {}

  ngOnInit() {
    this.movieGenres = GENRESLABEL;
    this.movieLanguages = LANGUAGESLABEL;
    this.movieCertifications = CERTIFICATIONSLABEL;
    this.movieMedias = MEDIASLABEL;
    this.movieTerritories = TERRITORIESLABEL;
    this.languagesFilter = this.languageControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this._languageFilter(value))
    );
    this.territoriesFilter = this.territoryControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(territory => this._territoriesFilter(territory))
    );
    this.movieSearchResults$ = combineLatest([
      this.fireQuery.collection<Movie>('movies').valueChanges(),
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
    ]).pipe(
      map(([movies, filterOptions]) => movies.filter(movie => filterMovie(movie, filterOptions)))
    );
  }

  ////////////////////
  // Filter section //
  ////////////////////

  private _territoriesFilter(territory: string): string[] {
    const filterValue = territory.toLowerCase();
    return this.movieTerritories.filter(movieTerritory => {
      return movieTerritory.toLowerCase().includes(filterValue);
    });
  }

  private _languageFilter(value: string): string[] {
    return this.movieLanguages.filter(language =>
      language.toLowerCase().includes(value.toLowerCase())
    );
  }

  //////////////////
  // Form section //
  //////////////////

  public addLanguage(language: LanguagesLabel) {
    if (this.movieLanguages.includes(language)) {
      this.filterForm.addLanguage(language);
    }
  }

  public removeLanguage(language: LanguagesLabel) {
    this.filterForm.removeLanguage(language);
  }

  public deleteLanguage(language: LanguagesLabel) {
    this.filterForm.removeLanguage(language);
  }

  public hasGenre(genre: GenresLabel) {
    if (this.movieGenres.includes(genre) && !this.filterForm.get('type').value.includes(genre)) {
      this.filterForm.addType(genre);
    } else {
      this.filterForm.removeType(genre);
    }
  }

  public checkCertification(certification: CertificationsLabel) {
    if (this.movieCertifications.includes(certification)) {
      this.filterForm.checkCertification(certification);
    }
  }

  public checkMedia(media: MediasLabel) {
    if (this.movieMedias.includes(media)) {
      this.filterForm.checkMedia(media);
    }
  }

  public removeTerritory(territory: string, index: number) {
    const i = this.selectedMovieTerritories.indexOf(territory);

    if (i >= 0) {
      this.selectedMovieTerritories.splice(i, 1);
    }
    this.filterForm.removeTerritory(index);
  }

  public selectedTerritory(territory: MatAutocompleteSelectedEvent) {
    if (!this.selectedMovieTerritories.includes(territory.option.viewValue)) {
      this.selectedMovieTerritories.push(territory.option.value);
    }
    this.filterForm.addTerritory(territory.option.viewValue as TerritoriesLabel);
    this.territoryInput.nativeElement.value = '';
  }
}
