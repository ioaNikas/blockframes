import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateListGuard, FireQuery, Query } from '@blockframes/utils';
import { AuthQuery } from '@blockframes/auth';
import { OrganizationStore, Organization } from '../+state';
import { switchMap, map } from 'rxjs/operators';

const orgQuery = (uid: string): Query<Organization[]> => ({
  path: 'orgs',
  queryFn: ref => ref.where('userIds', 'array-contains', uid)
})

@Injectable({ providedIn: 'root' })
export class OrgListGuard extends StateListGuard<Organization> {
  urlFallback: 'layout';

  constructor(
    private fireQuery: FireQuery,
    private authQuery: AuthQuery,
    store: OrganizationStore,
    router: Router
  ) {
    super(store, router)
  }

  get query() {
    return this.authQuery.user$.pipe(
      map(({uid}) => orgQuery(uid)),
      switchMap(query => this.fireQuery.fromQuery(query))
    )
  }
}
