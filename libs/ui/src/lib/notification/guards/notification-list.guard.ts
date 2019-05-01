import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateListGuard, FireQuery, Query } from '@blockframes/utils';
import { NotificationStore, Notification } from '../+state';
import { AuthQuery } from '@blockframes/auth';
import { map, switchMap } from 'rxjs/operators';

const notificationQuery = (uid: string): Query<Notification[]> => ({
    path: `notifications`,
    queryFn: ref => ref.where('userId', '==', uid)
})

@Injectable({ providedIn: 'root' })
export class NotificationListGuard extends StateListGuard<Notification> {
  readonly urlFallback = 'layout';

  constructor(
    private fireQuery: FireQuery,
    private authQuery: AuthQuery,
    store: NotificationStore,
    router: Router
  ) {
    super(store, router)
  }

  get query() {
    return this.authQuery.user$.pipe(
      map(({uid}) => notificationQuery(uid)),
      switchMap(query => this.fireQuery.fromQuery(query))
    )
  }
}
