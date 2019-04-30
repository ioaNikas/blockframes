import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MovieQuery } from '../+state';
import { Observable } from 'rxjs';
import { getLabelBySlug } from '../staticModels';

@Component({
  selector: 'movie-form-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
  public form$ : Observable<any>;

  constructor(private query: MovieQuery) {}

  ngOnInit() {
    this.form$ = this.query.movieFormChanges$;
  }

  /* Returns label from json staticModels */
  public getStaticBySlug (scope: string, slug: string) {
    return getLabelBySlug (scope, slug) as string;
  }

}
