import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryService } from '../+state';
import { Stakeholder, StakeholderService, StakeholderQuery } from '@blockframes/movie';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'delivery-team-work-view',
  templateUrl: './delivery-team-work-view.component.html',
  styleUrls: ['./delivery-team-work-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryTeamWorkViewComponent implements OnInit, OnDestroy {
  public movieStakeholders$: Observable<Stakeholder[]>;
  public deliveryStakeholders$: Observable<Stakeholder[]>;
  public isAlive = true;
  public stakeholderId: string;

  constructor(
    private stakeholderService: StakeholderService,
    private service: DeliveryService,
    private stakeholderQuery: StakeholderQuery,
  ) {}

  ngOnInit() {
    this.service.subscribeOnDeliveryStakeholders().pipe(takeWhile(() => this.isAlive)).subscribe();

    this.deliveryStakeholders$ = this.stakeholderQuery.selectAll();
    this.movieStakeholders$ = this.stakeholderService.stakeholdersByMovie$;
  }

  public openForm(stakeholder: Stakeholder) {
    this.stakeholderId = stakeholder.id;
  }

  public cancelForm() {
    delete this.stakeholderId;
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}