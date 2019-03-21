import { Injectable } from '@angular/core';
import { OrganizationQuery, OrganizationStore } from '@blockframes/organization';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { TemplateStore } from './template.store';
import { Template } from './template.model';


@Injectable({ providedIn: 'root' })
export class TemplateService {

  public subscribeOnOrganizationTemplates$ = this.organizationQuery.selectActiveId()
      .pipe(
        filter(id => !!id),
        switchMap(id =>
          this.db.collection<Template>(`orgs/${id}/templates`).valueChanges()
        ),
        tap(templates => this.store.set( templates ))
      );


  constructor(
    private organizationQuery: OrganizationQuery,
    private db : AngularFirestore,
    private store: TemplateStore,
    ) {}



}
