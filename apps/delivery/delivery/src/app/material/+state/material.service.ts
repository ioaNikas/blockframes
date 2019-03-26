import { Injectable } from '@angular/core';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Material, createMaterial } from './material.model';
import { OrganizationQuery } from '@blockframes/organization';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialStore } from './material.store';
import { TemplateQuery } from '../../template/+state/template.query';
import { Template } from '../../template/+state/template.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  public subscribeOnOrganizationMaterials$ = this.organizationQuery.selectActiveId().pipe(
    filter(id => !!id),
    switchMap(id => this.db.collection<Material>(`orgs/${id}/materials`).valueChanges()),
    tap(materials => this.store.set(materials))
  );

  constructor(
    private organizationQuery: OrganizationQuery,
    private db: AngularFirestore,
    private store: MaterialStore,
    private templateQuery: TemplateQuery
  ) {}

  public deleteMaterial(id) {
    const idOrg = this.organizationQuery.getActiveId();

    // delete materialId of materialsId of sub-collection template
    const template = this.templateQuery.getActive();
    const materialsId = [...template.materialsId];
    const index = materialsId.indexOf(id);
    materialsId.splice(index, 1);
    this.db.doc<Template>(`orgs/${idOrg}/templates/${template.id}`).update({ materialsId });

    this.db.doc<Material>(`orgs/${idOrg}/materials/${id}`).delete();
  }

  public updateMaterial(material, form) {
    const idOrg = this.organizationQuery.getActiveId();
    this.db
      .doc<Material>(`orgs/${idOrg}/materials/${material.id}`)
      .update({ ...material, ...form });
  }

  public addMaterial(category: string) {
    // Add material to sub-collection materials of organization
    const idOrg = this.organizationQuery.getActiveId();
    const idMaterial = this.db.createId();
    const material = createMaterial({ id: idMaterial, category });
    this.db.doc<Material>(`orgs/${idOrg}/materials/${idMaterial}`).set(material);

    // Add materialId of materialsId of sub-collection template
    const template = this.templateQuery.getActive();
    const materialsId = [...template.materialsId];
    materialsId.push(material.id);
    this.db.doc<Template>(`orgs/${idOrg}/templates/${template.id}`).update({ materialsId });
  }
}
