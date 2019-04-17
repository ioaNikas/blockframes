import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Movie, MovieQuery, MovieService } from '../+state';
import { Observable } from 'rxjs';
import { Organization, OrganizationQuery } from '@blockframes/organization';
import { MatDialog } from '@angular/material/dialog';
import { TitleFormComponent } from '../title-form/title-form.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'movie-financing-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {
  orgs$: Observable<Organization[]>;
  movies$: Observable<Movie[]>;
  isAlive= true;


  constructor(
    private query: MovieQuery,
    private service: MovieService,
    private orgQuery: OrganizationQuery,
    private dialog: MatDialog
  ) {}

  // Initiate the Movies in Akita
  ngOnInit() {
    this.orgs$ = this.orgQuery.selectAll();
    this.service.moviesOfOrganizations$.pipe(takeWhile(() => this.isAlive)).subscribe();
    this.movies$ = this.query.selectAll();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
  public addNewMovie(orgId, orgName) {
    this.dialog.open(TitleFormComponent, { data: { id: orgId, name: orgName } });
  }

  public delete(id: string) {
    this.service.remove(id);
  }

}
