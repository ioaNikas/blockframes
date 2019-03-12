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
    this.fetch();
  }

  fetch() {
    this.collection.valueChanges().subscribe((movies: Movie[]) => {
      this.store.set(movies);
    });
    // TODO: takewhile user connected
  }

  public add(movie: Movie) {
    const id = this.firestore.createId();
    this.collection.doc(id).set((createMovie({...movie, id})));
  }

  public update(id: string, movie: Partial<Movie>) {
    this.collection.doc(id).update(movie);
  }

  public remove(id: string) {
    this.collection.doc(id).delete()
  }

}
