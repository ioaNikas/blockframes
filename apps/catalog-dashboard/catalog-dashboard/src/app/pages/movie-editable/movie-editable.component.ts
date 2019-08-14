import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MovieForm } from '@blockframes/movie/movie/form/movie.form';
import { MovieQuery, MovieService } from '@blockframes/movie';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'catalog-movie-editable',
  templateUrl: './movie-editable.component.html',
  styleUrls: ['./movie-editable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogMovieEditableComponent implements OnInit {
  public editContent = 'main';
  public opened = false;
  public form: MovieForm;

  constructor(
    private movieQuery: MovieQuery,
    private snackBar: MatSnackBar,
    private movieService: MovieService,
    private router: Router,
  ) { }

  ngOnInit() {
    // @todo #587 => navigation arrows
    // @see https://projects.invisionapp.com/d/main#/console/17971669/374982976/preview

    this.form = new MovieForm(this.movieQuery.getActive());
  }

  public update() {
    // @todo
  }

  public openSidenav(name: string) {
    this.editContent = name;
    this.opened = true;
  }

  /* Saves the form */
  public submit() {
    if (!this.form.valid) {
      this.snackBar.open('form invalid', 'close', { duration: 2000 });
      throw new Error('Invalid form');
    } else {
      this.snackBar.open(`${this.form.get('main').get('title').get('original').value} saved.`, 'close', { duration: 2000 });
      this.movieService.update(this.movieQuery.getActiveId(), { ...this.form.value });
    }
  }

  private clear() {
    this.form.reset();
  }

  public cancel() {
    this.clear();
    this.router.navigateByUrl('');
  }
}
