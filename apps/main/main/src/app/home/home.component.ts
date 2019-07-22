import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Dapp {
  name: string;
  routerLink: string;
}

@Component({
  selector: 'blockframes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent {

  public dapps: Dapp[] = [
    {
      name: 'Media Financiers',
      routerLink: '../movie-financing'
    },
    {
      name: 'Stories and More',
      routerLink: '../stories-and-more'
    },
    {
      name: 'Media Delivering',
      routerLink: '../delivery' // Change to mediaDelivering
    },
    {
      name: 'Bigger Boat',
      routerLink: '../bigger-boat'
    }
  ]
}
