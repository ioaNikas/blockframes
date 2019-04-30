import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
@Component({
  selector: 'movie-form-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  public fullScreen = false;

  constructor() {}

  ngOnInit() {}
  
  public toggleFullScreen() {
    return this.fullScreen ? this.fullScreen = false : this.fullScreen = true;
  }
}
