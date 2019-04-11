import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DeliveryStore } from './delivery.store';
import { DeliveryQuery } from './delivery.query';
import { MaterialQuery } from '../../material/+state/material.query';
import { Material } from '../../material/+state/material.model';
import { createDelivery, Delivery } from './delivery.model';
import {
  createStakeholder,
  MovieQuery,
  Stakeholder,
  StakeholderQuery,
} from '@blockframes/movie';
import { OrganizationQuery } from '@blockframes/organization';
import { TemplateQuery } from '../../template/+state';
import { Router } from '@angular/router';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(
    private movieQuery: MovieQuery,
    private organizationQuery: OrganizationQuery,
    private materialQuery: MaterialQuery,
    private query: DeliveryQuery,
    private store: DeliveryStore,
    private templateQuery: TemplateQuery,
    private stakeholderQuery: StakeholderQuery,
    private router: Router,
    private db: AngularFirestore
  ) {}

        ///////////////////
        // CRUD MATERIAL //
        ///////////////////



  /** Adds material to the delivery sub-collection in firebase */
  public saveMaterial(material: Material) {
    const idDelivery = this.query.getActiveId();
    const idMaterial = this.db.createId();
    this.db
      .doc<Material>(`deliveries/${idDelivery}/materials/${idMaterial}`)
      .set({ ...material, id: idMaterial });
    this.db
      .doc<Delivery>(`deliveries/${idDelivery}`)
      .update({validated: []});
  }

  /** Deletes material of the delivery sub-collection in firebase */
  public deleteMaterial(id: string) {
    const idDelivery = this.query.getActiveId();
    this.db.doc<Material>(`deliveries/${idDelivery}/materials/${id}`).delete();
    this.db
    .doc<Delivery>(`deliveries/${idDelivery}`)
    .update({validated: []});
  }


  /** Changes material 'delivered' property value to true or false when triggered */
  public deliveredToggle(material: Material, movieId: string) {
    return this.db
      .doc<Material>(`movies/${movieId}/materials/${material.id}`)
      .update({ delivered: !material.delivered });
  }


        ///////////////////
        // CRUD DELIVERY //
        ///////////////////



  /** Initializes a new delivery in firebase
   *
   * @param templateId if templateId is present, the materials sub-collection is populated with materials from this template
   */
  public addDelivery(templateId?: string) {
    const id = this.db.createId();
    const stakeholder = this.query.findActiveStakeholder();
    const movieId = this.movieQuery.getActiveId();
    const delivery = createDelivery({ id, movieId });

    const authorizations = ['canValidateDelivery'];
    const deliveryStakeholder = createStakeholder({
      id: stakeholder.id,
      orgId: stakeholder.orgId,
      authorizations
    });

    this.db.doc<Delivery>(`deliveries/${id}`).set(delivery);
    this.db
      .doc<Stakeholder>(`deliveries/${id}/stakeholders/${deliveryStakeholder.id}`)
      .set( deliveryStakeholder );
    this.store.setActive(id);
    if (!!templateId) {
      const filterByMaterialId = material =>
        this.templateQuery.getActive().materialsId.includes(material.id);
      const materials = this.materialQuery.getAll({ filterBy: filterByMaterialId });
      return Promise.all(
        materials.map(material =>
          this.db.doc<Material>(`deliveries/${id}/materials/${material.id}`).set(material)
        )
      );
    }
  }

  /**
   * Navigates to delivery form and delete all signatures in `validated[]`
   */
  public editDelivery() {
    const delivery = this.query.getActive();
    this.db.doc<Delivery>(`deliveries/${delivery.id}`).set({ ...delivery, validated: [] });
    this.router.navigate([`layout/${this.movieQuery.getActiveId()}/form/${delivery.id}`]);
    //TODO: ask all stakeholders for permission to re-open the delivery form
    //TODO: secure this so we can't get there with raw url
  }

  /** Deletes delivery and all the sub-collections in firebase */
  public async deleteDelivery() {
    const id = this.query.getActiveId();

    this.db.doc<Delivery>(`deliveries/${id}`).delete();

    const materials: firebase.firestore.QuerySnapshot = await this.db
      .collection<Material>(`deliveries/${id}/materials`)
      .ref.get();
    const batch = this.db.firestore.batch();
    materials.forEach(doc => batch.delete(doc.ref));

    const stakeholders: firebase.firestore.QuerySnapshot = await this.db
      .collection<Stakeholder>(`deliveries/${id}/stakeholders`)
      .ref.get();
    stakeholders.forEach(doc => batch.delete(doc.ref));

    batch.commit();

    this.store.setActive(null);
  }

  /** Adds a stakeholder with specific authorization to the delivery */
  public addStakeholder(stakeholder: Stakeholder, authorization: string) {
    // TODO: Improve this function so we can add multiple authorizations in the array
    if (!stakeholder.authorizations) {
      const authorizations = [ authorization ];
      this.db
        .doc<Stakeholder>(`deliveries/${this.query.getActiveId()}/stakeholders/${stakeholder.id}`)
        .set({ ...stakeholder, authorizations });
    } else {
      const authorizations = [ ...stakeholder.authorizations, authorization ];
      this.db
        .doc<Stakeholder>(`deliveries/${this.query.getActiveId()}/stakeholders/${stakeholder.id}`)
        .update({ authorizations });
    }
  }

  /** Returns true if number of signatures in validated equals number of stakeholders in delivery sub-collection */
  public async isDeliveryValidated(): Promise<boolean> {
    const delivery = this.query.getActive();
    const stakeholders = await this.db.collection<Stakeholder>(`deliveries/${delivery.id}/stakeholders`).get().toPromise();
    return delivery.validated.length === stakeholders.size;
}

  /** Returns stakeholders updated with stakeholders of the store stakeholders (movie-lib) */
  private updateDeliveryShWithMovieSh(stakeholders) {
    const updatedSh$ = stakeholders.map(stakeholder =>
      this.stakeholderQuery
        .selectEntity(stakeholder.id)
        .pipe(map(movieSh => ({ ...movieSh, ...stakeholder })))
    );
    return combineLatest(updatedSh$);
  }


        ////////////////////////
        // START SUBSCRIPTION //
        ////////////////////////

  /** Merge stakeholders of delivery with stakeholders of movie */
  public subscribeOnDeliveryStakeholders() {
    return this.db
      .collection<Stakeholder>(`deliveries/${this.query.getActiveId()}/stakeholders`)
      .valueChanges()
      .pipe(
        switchMap(deliverySh => this.updateDeliveryShWithMovieSh(deliverySh)),
        tap(updatedSh => this.store.update(this.query.getActiveId(), { stakeholders: updatedSh }))
      );
  }

  public subscribeOnActiveDelivery() {
    return this.query.selectActiveId().pipe(
      switchMap(id => this.db.doc<Delivery>(`deliveries/${id}`).valueChanges()),
      tap(delivery =>
        this.query.hasEntity(delivery.id) ? this.store.update(delivery.id, delivery) : this.store.add(delivery)
        )
    );
  }

  public signDelivery() {
    const orgIdsOfUser = this.organizationQuery.getAll().map(org => org.id);
    const { stakeholders, validated } = this.query.getActive();

    const stakeholderSignee = stakeholders.find(({orgId}) => orgIdsOfUser.includes(orgId));

    if (!validated.includes(stakeholderSignee.id)) {
      const updatedValidated = [ ...validated, stakeholderSignee.id ];
      this.db.doc<Delivery>(`deliveries/${this.query.getActiveId()}`).update({ validated: updatedValidated });
    }
  }
}
