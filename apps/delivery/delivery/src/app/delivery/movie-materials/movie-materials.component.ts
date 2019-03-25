import { Component, OnInit } from '@angular/core';
import { Movie, MovieQuery } from '@blockframes/movie';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Material } from '../../material/+state';
import { DeliveryService } from '@blockframes/delivery';

@Component({
  selector: 'delivery-movie-materials',
  templateUrl: './movie-materials.component.html',
  styleUrls: ['./movie-materials.component.scss']
})
export class MovieMaterialsComponent implements OnInit {

  public movie$: Observable<Movie>;
  public materials$: Observable<Object>;
  public progressionValue$: Observable<number>;

  constructor(
    private movieQuery: MovieQuery,
    private location: Location,
    private deliveryService: DeliveryService,
    ) { }

  ngOnInit() {
    this.movie$ = this.movieQuery.selectActive();
    this.materials$ = this.deliveryService.getDeliveryMaterialsByActiveMovie();
    this.progressionValue$ = this.deliveryService.getMovieProgression();
  }

  public deliveredToggle(material: Material, movieId: string) {
    this.deliveryService
      .deliveredToggle(material, movieId)
      .catch(err => console.log(err));
  }

  public goBack() {
    this.location.back();
  }

}
