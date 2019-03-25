import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material, MaterialStore } from '../../../../../apps/delivery/delivery/src/app/material/+state';
import { Movie, MovieQuery } from '@blockframes/movie';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { DeliveryStore } from './delivery.store';
import { Delivery } from '@blockframes/delivery';
import { DeliveryQuery } from './delivery.query';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(
    private firestore: AngularFirestore,
    private movieQuery: MovieQuery,
    private deliveryQuery: DeliveryQuery,
    private deliveryStore: DeliveryStore,
    private materialStore: MaterialStore,
    ) {}

  public deliveredToggle(material: Material, movieId: string) {
    return this.firestore
      .collection<Movie>(`movies/${movieId}/materials/`)
      .doc(material.id)
      .update({ delivered: !material.delivered });
  }

  public deliveryMaterialsByActiveMovie() {
    // Sort the active movie's delivery's materials by category
    return this.movieQuery.selectActive().pipe(
      filter(movie => !!movie),
      switchMap(movie =>
        this.firestore.collection<Material>(`movies/${movie.id}/materials`).valueChanges()
      ),
      map(materials =>
        materials.reduce((acc, item) => {
          return {
            ...acc,
            [item.category.toUpperCase()]: [...(acc[item.category.toUpperCase()] || []), item]
          };
        }, {})
      )
    );
  }

  public deliveriesByActiveMovie() {
    return this.movieQuery.selectActiveId().pipe(
      filter(id => !!id),
      switchMap(id =>
        this.firestore
          .collection<Delivery>('deliveries', ref => ref.where('movieId', '==', id))
          .valueChanges()
      ),
      tap(deliveries => this.deliveryStore.set(deliveries))
    );
  }

  public materialsByActiveDelivery() {
    return this.movieQuery.selectActive().pipe(
      filter(movie => !!movie),
      switchMap (movie => this.firestore.collection<Material>(`movies/${movie.id}/materials`).valueChanges()
      ),
      tap(materials => this.materialStore.set(materials)),
      map(materials => {
        let id: string;
        this.deliveryQuery.selectActiveId().subscribe(data => id = data)
        const deliveryMaterials = [];
        materials.forEach(material => {
          if (!!material && material.deliveriesIds.includes(id)) {
            deliveryMaterials.push(material);
          }
        })
        return deliveryMaterials;
      })
    )
  }
}
