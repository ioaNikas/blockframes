import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  AppDetailsWithStatus,
  OrganizationQuery,
  OrganizationService
} from '@blockframes/organization';

@Component({
  selector: 'app-grid',
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppGridComponent implements OnInit {
  public apps$: Observable<AppDetailsWithStatus[]>;

  constructor(
    private organizationQuery: OrganizationQuery,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {
    this.apps$ = this.organizationQuery.appsDetails$;
  }

  public requestAccess(appId: string) {
    const orgId = this.organizationQuery.getValue().org.id;
    return this.organizationService.requestAccessToApp(orgId, appId);
  }
}
