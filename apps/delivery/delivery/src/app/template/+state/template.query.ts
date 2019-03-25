import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TemplateStore, TemplateState } from './template.store';
import { Template } from './template.model';
import { MaterialQuery } from '../../material/+state';
import { map, filter, combineLatest, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplateQuery extends QueryEntity<TemplateState, Template> {

  constructor(protected store: TemplateStore, private materialQuery: MaterialQuery) {
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

  public materialsByTemplate$(id: string) {
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
