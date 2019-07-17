import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';

// TODO #638: delete this mock values
const mockPendingActions = [
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6']
  },
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6']
  },
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6']
  },
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6']
  }
];

const mockApprovedActions = [
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6'],
    date: '09.06.2019'
  },
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6'],
    date: '09.06.2019'
  },
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6'],
    date: '09.06.2019'
  },
  {
    docName: 'Lorem Ipsum',
    signers: ['1', '2', '3'],
    counterSigners: ['4', '5', '6'],
    date: '09.06.2019'
  }
];
@Component({
  selector: 'org-activity-view',
  templateUrl: './organization-activity-view.component.html',
  styleUrls: ['./organization-activity-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationActivityViewComponent implements OnInit {
  /** Observable which contains pending actions */
  // TODO #638: work with real data
  public pendingActions$ = of(mockPendingActions);

  /** Observable which contains approved actinos */
  // TODO #638: work with real data
  public approvedActions$ = of(mockApprovedActions);

  // TODO #638: replace any
  public sidenavContent: any[];

  // Flag to indicate whether sidenav is open or not
  public opened = false;

  // TODO #638: save it for later
  constructor() {}

  ngOnInit() {}

    // TODO #638: replace any refactor the function when you know how the real data is going to look like
    // also the sidenav is going to need a refactoring
    public openSidenav(signers: any) {
      this.opened = !this.opened;
      this.sidenavContent = signers;
    }
}
