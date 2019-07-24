import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../+state';
import { Router } from '@angular/router';
import { initial } from 'lodash';

@Component({
  selector: 'movie-title-form',
  templateUrl: './movie-title-form.component.html',
  styleUrls: ['./movie-title-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTitleFormComponent implements OnInit {
  public titleForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MovieTitleFormComponent>,
    private snackBar: MatSnackBar,
    private builder: FormBuilder,
    private service: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleForm = this.builder.group({
      title: ['', Validators.required]
    });
  }

  public async newMovie() {
    if (!this.titleForm.valid) {
      this.snackBar.open('Invalid form', 'close', { duration: 1000 });
      return;
    }

    try {
      const { title } = this.titleForm.value;
      this.snackBar.open('Movie created! Redirecting..', 'close', { duration: 3000 });
      const movie = await this.service.addMovie(title);

      // TODO: Figure out why router doesn't work with relative path:
      // this.router.navigate([`../${movie.id}/edit`], {relativeTo: this.route});
      const baseUrl = initial(this.router.url.split('/')).join('/');
      this.router.navigate([`${baseUrl}/${movie.id}/edit`]);

      this.dialogRef.close();
    } catch (err) {
      this.snackBar.open('An error occured', 'close', { duration: 1000 });
      throw new Error(err);
    }
  }

  public cancel() {
    this.dialogRef.close();
  }
}
