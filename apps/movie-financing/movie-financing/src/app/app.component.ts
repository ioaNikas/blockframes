import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@blockframes/auth';
import { MovieService } from '@blockframes/movie';

@Component({
  selector: 'movie-financing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit() {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.movieService.initiated = false;
  }
}
