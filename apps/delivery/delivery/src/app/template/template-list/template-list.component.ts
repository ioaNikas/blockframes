import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TemplateService, Template, TemplateQuery } from '../+state';
import { OrganizationStore } from '@blockframes/organization';
import { Observable } from 'rxjs';

@Component({
  selector: 'template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {

  public templates$: Observable<Template[]>

  constructor(
    private service: TemplateService,
    private organizationStore: OrganizationStore,
    private query: TemplateQuery,
  ) { }

  ngOnInit() {
    this.organizationStore.setActive('eclAGMAMPl6l5lPov2ql');
    this.service.subscribeOnOrganizationTemplates$.subscribe();

    this.templates$ = this.query.selectAll();
  }

}
