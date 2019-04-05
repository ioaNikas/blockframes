import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Stakeholder, StakeholderService, createStakeholder } from '../+state';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as firebase from 'firebase';
import { MovieQuery } from '../../movie/+state';

interface Organization {
  id: string;
  name?: string;
}

@Component({
  selector: 'stakeholder-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeholderListComponent implements OnInit {
  public stakeholders$: Observable<Stakeholder[]>;
  public addStakeholderForm: FormGroup;
  public orgOptions: Organization[];
  public activeMovieId: string;

  constructor(
    private service: StakeholderService,
    private builder: FormBuilder,
    private movieQuery: MovieQuery,

  ) { }

  ngOnInit() {
    this.stakeholders$ = this.service.stakeholdersByActiveMovie$;
    this.orgOptions = [];
    this.addStakeholderForm = this.builder.group({
      org: null
    });
    this.onChange();
    this.activeMovieId = this.movieQuery.getActiveId();
  }

  public submit(org: Organization) {
    if (!(typeof org !== typeof '')) {
      throw new Error('Invalid form');
    }
    const sh = createStakeholder({orgId : org.id});
    this.service.add(this.activeMovieId, sh);
  }

  public displayFn(org?: Organization): string | undefined {
    return org ? org.name : undefined;
  }

  private async listOrgsByName(prefix: string): Promise<Organization[]> {
    const f = firebase.functions().httpsCallable('findOrgByName');
    return f({ prefix }).then(x => x.data);
  }

  private async onChange() {
    this.addStakeholderForm.valueChanges.subscribe(x => {
      // TODO: debounce
      this.listOrgsByName(x.org)
        .then(xs => {
          // TODO: use an observable
          this.orgOptions = xs;
        });
    });
  }

  public remove(stakeholderId: string) {
    this.service.remove(this.activeMovieId, stakeholderId);
  }

}
