import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MovieStore } from './movie.store';
import { Movie, createMovie } from './movie.model';


@Injectable({ providedIn: 'root' })
export class MovieService {
  private collection: AngularFirestoreCollection<Movie>;

  constructor(
  private store: MovieStore,
  private firestore: AngularFirestore,
  ) {
    this.collection = this.firestore.collection('movie');
  }

  public add(movie: Movie) {
    const id = this.firestore.createId();
    this.store.add(createMovie({...movie, id}));
  }

  public update(id: string, movie: Partial<Movie>) {
    this.store.update(id, movie);
  }

  public remove(id: string | string[]) {
    this.store.remove(id);
  }

}
