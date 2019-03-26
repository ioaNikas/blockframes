import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { OrganizationStore } from '@blockframes/organization';
import { MaterialService, MaterialQuery } from '../../material/+state';
import { takeWhile, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateQuery, TemplateStore } from '../+state';

@Component({
  selector: 'delivery-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements OnInit, OnDestroy {
  private isAlive = true;

  public template$: Observable<any>;
  public nimp: Observable<any>;

  constructor(
    private organizationStore: OrganizationStore,
    private materialService: MaterialService,
    private route: ActivatedRoute,
    private store: TemplateStore,
    private query: TemplateQuery,
  ) {}

  ngOnInit() {
    this.organizationStore.setActive('eclAGMAMPl6l5lPov2ql'); // while organization does not stay active



    this.template$ = this.route.params.pipe(switchMap(params =>
      {this.store.setActive(params.templateId);
      return this.query.materialsByTemplate$;}
      ));

    // todo materials by template




  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
