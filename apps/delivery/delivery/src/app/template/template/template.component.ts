import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { OrganizationStore } from '@blockframes/organization';
import { MaterialService, MaterialQuery } from '../../material/+state';
import { takeWhile, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateQuery } from '../+state';

@Component({
  selector: 'delivery-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements OnInit, OnDestroy {

  private isAlive = true;

  public template$: Observable<any>;

  constructor(
    private organizationStore: OrganizationStore,
    private materialService: MaterialService,
    private route: ActivatedRoute,
    private query: TemplateQuery,
    private materialQuery: MaterialQuery,
  ) { }

  ngOnInit() {
    this.organizationStore.setActive('eclAGMAMPl6l5lPov2ql'); // while organization does not stay active

    this.materialService.subscribeOnOrganizationMaterials$.pipe(takeWhile(() => this.isAlive)).subscribe();

    // todo materials by template
    this.template$ = this.route.params.pipe(
      switchMap(params => this.query.templates$())
    );
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}
