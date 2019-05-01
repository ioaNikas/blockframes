import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateStore, Template } from '../+state';
import { StateListGuard } from '@blockframes/utils';
import { map, switchMap } from 'rxjs/operators';
import { OrganizationQuery } from '@blockframes/organization';
import { FireQuery, Query } from '@blockframes/utils';
import { combineLatest } from 'rxjs';

export const templateListQuery = (orgId: string): Query<Template[]> => ({
  path: `orgs/${orgId}/templates`,
  orgId
})

@Injectable({
  providedIn: 'root'
})
export class TemplateListGuard extends StateListGuard<Template> {
  urlFallback = 'layout';

  constructor(
    private orgQuery: OrganizationQuery,
    private fireQuery: FireQuery,
    store: TemplateStore,
    router: Router,
  ) {
    super(store, router);
  }

  get query() {
    return this.orgQuery.selectAll().pipe(
      switchMap(orgs => {
        const templates$ = orgs.map(org => {
          const query = templateListQuery(org.id);
          return this.fireQuery.fromQuery(query);
        });
        return combineLatest(templates$);
      }),
      map(templates => [].concat(...templates)),
    )
  }
}
