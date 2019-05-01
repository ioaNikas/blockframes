import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService, MovieQuery } from '../+state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organization, OrganizationQuery } from '@blockframes/organization';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'movie-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleFormComponent implements OnInit {
  public titleForm: FormGroup;
  public orgList$: Observable<Organization[]>;
  private alive = true;

  constructor(
    private dialogRef: MatDialogRef<TitleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public org: any,
    private snackBar: MatSnackBar,
    private builder: FormBuilder,
    private service: MovieService,
    private router: Router,
    private orgQuery: OrganizationQuery,
    private movieQuery: MovieQuery,
  ) { }

  ngOnInit() {
    this.titleForm = this.builder.group({
      title: ['', Validators.required]
    });
    this.orgList$ = this.orgQuery.selectAll();
  }

  public async newMovie() {
    if (!this.titleForm.valid) {
      this.snackBar.open('Invalid form', 'close', { duration: 1000 });
      return
    }

    try {
      const { title } = this.titleForm.value;
      this.snackBar.open('Movie created! Redirecting..', 'close', { duration: 5000 });
      const movie = await this.service.add(title, this.org.id);

      this.movieQuery.selectEntity(movie.id)
        .pipe(takeWhile(_ => this.alive))
        .subscribe(m => {
        if (m !== undefined) {
          this.alive = false;
          this.router.navigate([`/layout/home/${movie.id}/form`]);
          this.dialogRef.close();
        }
      })
    }
    catch (err) {
      this.snackBar.open('An error occured', 'close', { duration: 1000 });
      throw new Error('An error occured');
    }
  }

  public cancel() {
    this.dialogRef.close();
  }

}
