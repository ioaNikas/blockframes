import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../+state';
import { Observable } from 'rxjs';
import { OrganizationQuery, OrganizationWithMovies, Organization } from '@blockframes/organization';
import { MatDialog } from '@angular/material/dialog';
import { TitleFormComponent } from '../title-form/title-form.component';

@Component({
  selector: 'movie-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit, OnDestroy {
  orgs$: Observable<OrganizationWithMovies[]>;
  isAlive= true;


  constructor(
    private service: MovieService,
    private orgQuery: OrganizationQuery,
    private dialog: MatDialog
  ) {}

  // Initiate the Movies in Akita
  ngOnInit() {
    this.orgs$ = this.orgQuery.orgsWithMovies$;
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
  public addNewMovie(org: { id: string, name: string}) {
    this.dialog.open(TitleFormComponent, { data: org });
  }

  public delete(id: string) {
    this.service.remove(id);
  }

  public trackOrgs(index: number, org: Organization) {
    return org.id;
  }
}
