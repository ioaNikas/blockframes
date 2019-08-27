import { Movie } from '@blockframes/movie';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieQuery } from '@blockframes/movie';

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
  public parsedRightEnds: Date;

  constructor(private query: MovieQuery) {}

  ngOnInit() {
    this.getMovie();
  }

  private async getMovie() {
    this.loading$ = this.query.selectLoading();
    this.movieId = this.query.getActiveId();
    this.movie$ = this.query.selectActive();
    this.movie$.subscribe(
      data => (this.parsedRightEnds = (data.salesAgentDeal.rightsEnd as any).to.toDate())
    );
  }

  get internationalPremiere() {
    let name, year;
    this.movie$.subscribe(data => {
      name = data.salesInfo.internationalPremiere.name;
      year = data.salesInfo.internationalPremiere.year;
    });
    return name !== '' ? `${name}, ${year}` : null;
  }

  get color() {
    let color;
    this.movie$.subscribe(data => (color = data.salesInfo.color));
    return color === 'c' ? 'color' : 'black & white';
  }

  get europeanQualification() {
    let europeanQualification;
    this.movie$.subscribe(data => (europeanQualification = data.salesInfo.europeanQualification));
    return europeanQualification ? 'Yes' : 'No';
  }
}
