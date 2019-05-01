import { Observable } from "rxjs";
import { Router, UrlTree, CanActivate, CanDeactivate } from "@angular/router";
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


export abstract class StateActiveGuard {
  protected listenOnActive = false;

  abstract startListeningOnActive(...params: any[]): void;

  public stopListeningOnActive() {
    this.listenOnActive = false;
  }
}
