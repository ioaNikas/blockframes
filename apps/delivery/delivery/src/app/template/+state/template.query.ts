import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TemplateStore, TemplateState } from './template.store';
import { Template } from './template.model';
import { MaterialQuery, Material } from '../../material/+state';
import { map, filter, switchMap } from 'rxjs/operators';
import { combineLatest, } from 'rxjs';
import { OrganizationQuery } from '@blockframes/organization';

@Injectable({
  providedIn: 'root'
})
export class TemplateQuery extends QueryEntity<TemplateState, Template> {

  constructor
  (
    protected store: TemplateStore,
    private materialQuery: MaterialQuery,
    private organizationQuery: OrganizationQuery,
    ) {
    super(store);
  }

  public templates$() {
    return this.materialQuery.selectAll().pipe(
      map(materials =>
        materials.reduce((acc, item) => {
          return {
            ...acc,
            [item.category]: [...(acc[item.category] || []), item]
          };
        }, {})
      )
    );
  }


}
