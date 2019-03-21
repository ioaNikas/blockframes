import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Delivery } from './delivery.model';
import { Material } from '../../material/+state';
import { Movie } from '@blockframes/movie';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  public deliveriesCollection = this.db.collection<Delivery>('deliveries');

  constructor(
    private db: AngularFirestore,
  ) {}

  public deliveredToggle(material: Material, movieId: string) {
    return this.db
      .collection<Movie>(`movies/${movieId}/materials/`)
      .doc(material.id)
      .update({delivered : !material.delivered});
  }

}
