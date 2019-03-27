import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpQuery, Ip } from '@blockframes/ip';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ip-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  private alive = true;
  public ip: Ip;

  constructor(
    private query: IpQuery,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.route.params
    .pipe(takeWhile(_ => this.alive))
    .subscribe(params => {
      this.ip = this.query.getEntity(params.id);
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
