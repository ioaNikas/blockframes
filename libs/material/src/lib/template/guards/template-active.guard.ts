import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree, CanDeactivate } from '@angular/router';
import { TemplateStore, Template } from '../+state';
import { StateActiveGuard } from 'libs/utils/src/lib/state-guard';
import { Query, FireQuery } from '@blockframes/utils';
import { takeWhile, tap } from 'rxjs/operators';

export const templateActiveQuery = (orgId: string, templateId: string): Query<Template> => ({
  path: `orgs/${orgId}/templates/${templateId}`,
  materials: (template) => template.materialsId.map(id => ({
    path: `orgs/${orgId}/materials/${id}`
  }))
});

@Injectable({
  providedIn: 'root'
})
export class TemplateActiveGuard extends StateActiveGuard<Template> {
  readonly params = ['orgId', 'templateId'];
  readonly urlFallback = 'layout/template';

  constructor(
    private fireQuery: FireQuery,
    store: TemplateStore,
    router: Router,
  ) {
    super(store, router)
  }

  query({ orgId, templateId }) {
    const query = templateActiveQuery(orgId, templateId);
    return this.fireQuery.fromQuery(query);
  }
}
