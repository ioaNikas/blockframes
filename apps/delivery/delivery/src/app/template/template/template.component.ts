import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateQuery, TemplateStore } from '../+state';

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
    private route: ActivatedRoute,
    private store: TemplateStore,
    private query: TemplateQuery
  ) {}

  ngOnInit() {
    this.template$ = this.route.params.pipe(
      switchMap(params => {
        this.store.setActive(params.templateId);
        return this.query.materialsByTemplate$;
      })
    );
  }
}
