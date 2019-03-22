import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from '../../../../../apps/delivery/delivery/src/app/material/+state';
import { Movie, MovieQuery } from '@blockframes/movie';
import { filter, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(
    private firestore: AngularFirestore,
    private movieQuery: MovieQuery,
    ) {}

  public deliveredToggle(material: Material, movieId: string) {
    return this.firestore
      .collection<Movie>(`movies/${movieId}/materials/`)
      .doc(material.id)
      .update({ delivered: !material.delivered });
  }

  public deliveryMaterialsByActiveMovie() { // Sort the active movie's delivery's materials by category
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
}
