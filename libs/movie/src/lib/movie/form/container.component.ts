import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieQuery } from '../+state';
import { FormGroupLike } from '@datorama/akita';
@Component({
  selector: 'movie-form-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  public fullScreen = false;
  public form$ : Observable<FormGroupLike>;

  constructor(private query: MovieQuery) {}

  ngOnInit() {
    this.form$ = this.query.movieFormChanges$;
  }
  
  public toggleFullScreen() {
    return this.fullScreen = !this.fullScreen;
  }
}
