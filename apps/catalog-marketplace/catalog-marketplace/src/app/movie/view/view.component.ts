import { Movie } from '@blockframes/movie';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieQuery } from '@blockframes/movie';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'catalog-movie-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MovieViewComponent implements OnInit {
  public movie$: Observable<Movie>;
  public loading$: Observable<boolean>;
  public movieId: string;
  public parseRightEnds: Date;

  constructor(private query: MovieQuery) {}


  ngOnInit() {
    this.getMovie();
  }

  private async getMovie() {
    this.loading$ = this.query.selectLoading();
    this.movieId = this.query.getActiveId();
    this.movie$ = this.query
      .selectActive()
      .pipe(
        tap(
          ({ salesAgentDeal }) =>
            (this.parseRightEnds = (salesAgentDeal.rightsEnd as any).to.toDate())
        )
      );
  }

  public internationalPremiere(movie: Movie) {
    const name = movie.main.title.international;
    const year = movie.main.productionYear;
    return name !== '' ? `${name}, ${year}` : null;
  }

  get color() {
    const color = this.query.getActive().salesInfo.color;
    return color === 'c' ? 'color' : 'black & white';
  }

  get europeanQualification() {
    const europeanQualification = this.query.getActive().salesInfo.europeanQualification;
    return europeanQualification ? 'Yes' : 'No';
  }
}
