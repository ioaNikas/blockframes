import { Injectable } from '@angular/core';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Material, createMaterial } from './material.model';
import { OrganizationQuery } from '@blockframes/organization';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialStore } from './material.store';

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
  ) {}

  public deleteMaterial(id) {
    const idOrg = this.organizationQuery.getActiveId();
    this.db.doc<Material>(`orgs/${idOrg}/materials/${id}`).delete();
  }

  public updateMaterial(material, form) {
    const idOrg = this.organizationQuery.getActiveId();
    this.db.doc<Material>(`orgs/${idOrg}/materials/${material.id}`).update({...material, ...form});
  }

  public addMaterial(category: string) {
    const idOrg = this.organizationQuery.getActiveId();
    const idMaterial = this.db.createId();
    const material = createMaterial({id: idMaterial, category});
    this.db.doc<Material>(`orgs/${idOrg}/materials/${idMaterial}`).set(material);
  }

}
