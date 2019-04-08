import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MovieStore } from './movie.store';
import { Movie, createMovie } from './movie.model';
import { switchMap, tap, map, mergeAll, filter } from 'rxjs/operators';
import { createStakeholder, StakeholderService } from '../../stakeholder/+state';
import { OrganizationQuery } from '@blockframes/organization';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })

export class MovieService {
  private collection: AngularFirestoreCollection<Movie>;

  constructor(
  private store: MovieStore,
  private firestore: AngularFirestore,
  private orgQuery: OrganizationQuery,
  private shService: StakeholderService,
  ) {
    this.collection = this.firestore.collection<Movie>('movies');
  }



  public async add(title: string, orgId: string): Promise<Movie> {
    const id = this.firestore.createId();
    const owner = createStakeholder({orgId, orgMovieRole: 'ADMIN'});
    let movie: Movie = createMovie({ id, title: [title], orgId });
    this.store.add(movie);
    // we don't want to keep orgId in our Movie object
    movie = createMovie({ id, title: [title] });
    // TODO: correct race condition
    await this.collection.doc(id).set(movie);
    await this.shService.add(id, owner);

    return movie;
  }

  public update(id: string, movie: Partial<Movie>) {
    // we don't want to keep orgId in our Movie object
    if (movie.orgId) delete movie.orgId;
    this.collection.doc(id).update(movie);
  }

  public remove(id: string) {
    // TODO: make a firebase function
    this.collection.doc(id).delete();
  }

  public get fetchMoviesOrgs$(): Observable<Movie[]> {
    return this.orgQuery.selectAll().pipe(
      switchMap(orgs => orgs.map(
        org => combineLatest(org.movieIds.map(
          (id) => { if (id !== undefined) {
            return this.firestore.doc<Movie>(`movies/${id}`).valueChanges().pipe(
              map(movie => ({ ...movie, orgId: org.id}  as Movie))
            );
          }}
        ))
      )),
      // merge and add all movies from each org to the store.
      mergeAll(),
      tap(movies => this.store.add(movies))
    );
  }

}
