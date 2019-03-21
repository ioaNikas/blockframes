import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Material } from './material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  // public subscribeOnOrganizationMaterials$ = this.authQuery.selectUser$.pipe(
  //   switchMap(organization =>
  //     this.db
  //       .collection<Material>(`users/${organization.id}/materials`)
  //       .valueChanges()
  //       .pipe(tap(materials => this.materialStore.set(materials)))
  //   )
  // );

  constructor() {}
}
