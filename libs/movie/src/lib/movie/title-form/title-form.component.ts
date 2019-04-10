import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../+state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organization, OrganizationQuery } from '@blockframes/organization';

@Component({
  selector: 'movie-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleFormComponent implements OnInit {
  public titleForm: FormGroup;
  public orgList$: Observable<Organization[]>;

  constructor(
    private dialogRef: MatDialogRef<TitleFormComponent>,
    private builder: FormBuilder,
    private service: MovieService,
    private router: Router,
    private orgQuery: OrganizationQuery,
  ) { }

  ngOnInit() {
    this.titleForm = this.builder.group({
      title: ['', Validators.required],
      owner: ['', Validators.required],
    });
    this.orgList$ = this.orgQuery.selectAll();
  }

  public async newMovie() {
    try {
      // TODO: make owner by default if only one org
      const { title, owner } = this.titleForm.value;
      const movie = await this.service.add(title, owner);
      this.router.navigateByUrl(`/layout/home/form/${movie.id}`);
      this.dialogRef.close();
    }
    catch (err) {
      console.log('erreur dans le form')
    }
  }

  public cancel() {
    this.dialogRef.close();
  }

}
