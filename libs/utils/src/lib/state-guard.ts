import { Observable } from "rxjs";
import { Router, UrlTree, CanActivate, CanDeactivate, ActivatedRouteSnapshot } from "@angular/router";
import { takeWhile, tap } from "rxjs/operators";
import { EntityStore, applyTransaction } from "@datorama/akita";

export abstract class StateListGuard<T> implements CanActivate, CanDeactivate<any> {
  abstract query: Observable<T[]>;
  abstract urlFallback: string;
  private isListeningOnList = false;

  constructor(protected store: EntityStore<any, T>, protected router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    this.isListeningOnList = true;
    return new Promise((res, rej) => {
      this.query.pipe(
        tap(entities => applyTransaction(() => {
          entities.forEach(entity => this.store.upsert(entity[this.store.idKey], entity));
        })),
        takeWhile(_ => this.isListeningOnList)
      ).subscribe({
        next: result => res(!!result),
        error: err => res(this.router.parseUrl(this.urlFallback))
      })
    })
  }

  canDeactivate(): boolean {
    this.isListeningOnList = false;
    return true;
  }
}

export abstract class StateActiveGuard<T> implements CanActivate, CanDeactivate<any> {
  /** Specify the names of the params to check */
  abstract params: string[];
  abstract urlFallback: string;
  private isListeningOnActive = false;

  constructor(
    protected store: EntityStore<any, T>,
    protected router: Router,
  ) {}

  abstract query(params: object): Observable<T>

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> | UrlTree {
    const keys = Object.keys(route.params);
    const paramNotFound = this.params.find(param => !keys.includes(param));
    if (!paramNotFound) {
      console.error(`Parameter ${paramNotFound} has not been found`);
      return this.router.parseUrl(this.urlFallback);
    }

    this.isListeningOnActive = true;
    return new Promise((res, rej) => {
      this.query(route.params).pipe(
        takeWhile(_ => this.isListeningOnActive),
        tap(entity => applyTransaction(() => {
          this.store.upsert(entity[this.store.idKey], entity);
          this.store.setActive(entity[this.store.idKey]);
        }))
      ).subscribe({
        next: template => res(!!template),
        error: _ => res(this.router.parseUrl(this.urlFallback))
      });
    })
  }

  canDeactivate() {
    this.isListeningOnActive = false;
    return true;
  }

}
