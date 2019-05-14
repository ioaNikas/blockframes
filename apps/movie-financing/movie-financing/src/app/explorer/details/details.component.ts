import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getMovie } from '../../canne-data';
import { Observable } from 'rxjs';
import { AuthQuery, User } from '@blockframes/auth';
import { map, takeWhile } from 'rxjs/operators';
import { FinancingMovie } from '../search/search.component';

@Component({
  selector: 'financing-explorer-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancingExplorerDetailsComponent implements OnInit, OnDestroy {
  public movie$: Observable<FinancingMovie> = null;
  public user$: Observable<User>;
  public isBalanceLoading$: Observable<boolean>;
  public isAlive = true;

  constructor(
    private router: ActivatedRoute,
    public query: AuthQuery
  ) {
    this.movie$ = router.params.pipe(
      map(({ id }) => getMovie(id))
    );
    this.user$ = this.query.user$;

    this.isBalanceLoading$ = new Observable(subscriber => {
      subscriber.next(true)
      this.query.user$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((u) => {
        if(u !== null && u.balance !== undefined) {
          subscriber.next(false)
        }
      })
    })

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  public sumItems(items: Array<any>, attr: string) {
    return items.reduce((sum, item) => sum + parseFloat(item[attr]), 0);
  }
}
