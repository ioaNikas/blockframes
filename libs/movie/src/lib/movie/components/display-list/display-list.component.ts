import { Movie } from './../../+state/movie.model';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: '[movie] movie-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})
export class MovieDisplayListComponent {
  public displayedColumns: string[] = ['picture', 'title', 'director', 'productionYear'];
  public dataSource;

  @Input()
  set movie(movie: Movie[]) {
    this.dataSource = new MatTableDataSource(movie);
  }
}