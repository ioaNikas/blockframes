// Angular
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
  ViewChild,
  HostBinding
} from '@angular/core';
// Blockframes
import { Movie, MovieQuery } from '@blockframes/movie';
import {
  GenresLabel,
  GENRES_LABEL,
  LANGUAGES_LABEL,
  LanguagesLabel,
  CertificationsLabel,
  MediasLabel,
  CERTIFICATIONS_LABEL,
  MEDIAS_LABEL,
  TERRITORIES_LABEL,
  GenresSlug,
  CertificationsSlug,
  LanguagesSlug,
  MediasSlug,
  TerritoriesSlug
} from '@blockframes/movie/movie/static-model/types';
import { getCodeIfExists } from '@blockframes/movie/movie/static-model/staticModels';
import { languageValidator, ControlErrorStateMatcher, sortMovieBy } from '@blockframes/utils';
// RxJs
import { Observable, combineLatest } from 'rxjs';
import { startWith, map, debounceTime, switchMap, tap } from 'rxjs/operators';
// Others
import { CatalogSearchForm } from './search.form';
import { filterMovie } from './filter.util';

@Component({
  selector: 'catalog-movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceSearchComponent implements OnInit {
  @HostBinding('attr.page-id') pageId = 'catalog-search';

  /* Observable of all movies */
  public movieSearchResults$: Observable<Movie[]>;

  /* Instance of the search form */
  public filterForm = new CatalogSearchForm();

  /* Observables on the languages selected */
  public languages$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    map(({ languages }) => Object.keys(languages))
  );

  /* Array of sorting options */
  public sortOptions: string[] = ['All films', 'Title', 'Director', 'Production Year'];

  /* Flag to indicate either the movies should be presented as a card or a list */
  public listView: boolean;

  /* Data for UI */
  public movieGenres: GenresLabel[] = GENRES_LABEL;
  public movieCertifications: CertificationsLabel[] = CERTIFICATIONS_LABEL;
  public movieMedias: MediasLabel[] = MEDIAS_LABEL;

  /* Filter for autocompletion */
  public territoriesFilter: Observable<string[]>;
  public languagesFilter: Observable<string[]>;

  /* Individual form controls for filtering */
  public languageControl: FormControl = new FormControl('', [
    Validators.required,
    languageValidator
  ]);
  public territoryControl: FormControl = new FormControl('');
  public sortByControl: FormControl = new FormControl('');

  /* Observable to combine for the UI */
  private sortBy$ = this.sortByControl.valueChanges.pipe(
    startWith('All films'),
    switchMap(sortIdentifier =>
      this.movieQuery.selectAll({ sortBy: (a, b) => sortMovieBy(a, b, sortIdentifier) })
    )
  );
  private filterBy$ = this.filterForm.valueChanges.pipe(startWith(this.filterForm.value));

  /* Arrays for showing the selected entities in the UI */
  public selectedMovieTerritories: string[] = [];

  /* Flags for the chip input */
  public visible = true;
  public selectable = true;
  public removable = true;

  /* Number of available movies in the database */
  public availableMovies: number;

  public matcher = new ControlErrorStateMatcher();

  @ViewChild('territoryInput', { static: false }) territoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(private movieQuery: MovieQuery, private router: Router) {}

  ngOnInit() {
    this.movieSearchResults$ = combineLatest([this.sortBy$, this.filterBy$]).pipe(
      map(([movies, filterOptions]) => movies.filter(movie => filterMovie(movie, filterOptions))),
      tap(movies => (this.availableMovies = movies.length))
    );

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
  }

  public goToMovieDetails(id: string) {
    this.router.navigateByUrl(`layout/o/catalog/${id}`);
  }

  public get getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * @description function for determine if FormGroup error should be shown.
   * We want to show this error only, if the children controls don't have any error.
   * @param formGroupName name of the form group which determine the logic.
   */
  public showFormGroupError(formGroupName: string): boolean {
    if (formGroupName === 'productionYear') {
      return (
        !this.filterForm
          .get('productionYear')
          .get('from')
          .hasError('pattern') &&
        !this.filterForm
          .get('productionYear')
          .get('from')
          .hasError('max') &&
        (!this.filterForm
          .get('productionYear')
          .get('to')
          .hasError('pattern') &&
          this.filterForm.get('productionYear').hasError('invalidRange'))
      );
    } else {
      return (
        !this.filterForm
          .get('availabilities')
          .get('from')
          .hasError('min') && this.filterForm.get('availabilities').hasError('invalidRange')
      );
    }
  }

  ////////////////////
  // Filter section //
  ////////////////////

  private _territoriesFilter(territory: string): string[] {
    const filterValue = territory.toLowerCase();
    return TERRITORIES_LABEL.filter(movieTerritory => {
      return movieTerritory.toLowerCase().includes(filterValue);
    });
  }

  private _languageFilter(value: string): string[] {
    return LANGUAGES_LABEL.filter(language => language.toLowerCase().includes(value.toLowerCase()));
  }

  //////////////////
  // Form section //
  //////////////////

  public addLanguage(language: LanguagesLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const languageSlug: LanguagesSlug = getCodeIfExists('LANGUAGES', language);
    if (LANGUAGES_LABEL.includes(language)) {
      this.filterForm.addLanguage(languageSlug);
    } else {
      throw new Error('Something went wrong. Please choose a language from the drop down menu.');
    }
  }

  public removeLanguage(language: LanguagesLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const languageSlug: LanguagesSlug = getCodeIfExists('LANGUAGES', language);
    this.filterForm.removeLanguage(languageSlug);
  }

  public hasGenre(genre: GenresLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const genreSlug: GenresSlug = getCodeIfExists('GENRES', genre);
    if (
      this.movieGenres.includes(genre) &&
      !this.filterForm.get('type').value.includes(genreSlug)
    ) {
      this.filterForm.addType(genreSlug);
    } else {
      this.filterForm.removeType(genreSlug);
    }
  }

  public checkCertification(certification: CertificationsLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const certificationSlug: CertificationsSlug = getCodeIfExists('CERTIFICATIONS', certification);
    if (this.movieCertifications.includes(certification)) {
      this.filterForm.checkCertification(certificationSlug);
    }
  }

  public checkMedia(media: MediasLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const mediaSlug: MediasSlug = getCodeIfExists('MEDIAS', media);
    if (this.movieMedias.includes(media)) {
      this.filterForm.checkMedia(mediaSlug);
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
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const territorySlug: TerritoriesSlug = getCodeIfExists(
      'TERRITORIES',
      territory.option.viewValue
    );
    this.filterForm.addTerritory(territorySlug);
    this.territoryInput.nativeElement.value = '';
  }
}
