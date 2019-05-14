import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getMovie } from '../../canne-data';
import { Observable } from 'rxjs';
import { AuthQuery, User } from '@blockframes/auth';
import { map } from 'rxjs/operators';
import { FinancingMovie } from '../search/search.component';

@Component({
  selector: 'financing-explorer-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancingExplorerDetailsComponent {
  public movie$: Observable<FinancingMovie> = null;
  public user$: Observable<User>;
  public isBalanceLoading$: Observable<boolean>;

  constructor(
    private router: ActivatedRoute,
    public query: AuthQuery
  ) {
    this.movie$ = router.params.pipe(
      map(({ id }) => getMovie(id))
    );
    this.user$ = this.query.user$;

    this.isBalanceLoading$ = this.query.isBalanceLoading$;
  }

  public sumItems(items: Array<any>, attr: string) {
    return items.reduce((sum, item) => sum + parseFloat(item[attr]), 0);
  }
}
