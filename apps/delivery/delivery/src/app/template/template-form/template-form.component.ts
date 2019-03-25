import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Material, MaterialQuery, MaterialService } from '../../material/+state';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeWhile, map } from 'rxjs/operators';
import { OrganizationStore } from '@blockframes/organization';

@Component({
  selector: 'delivery-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormComponent implements OnInit {

  materials$: Observable<Material[]>;
  isAlive = true;

  constructor(
    private route: ActivatedRoute,
    private materialQuery: MaterialQuery,
    private materialService: MaterialService,
    private organizationStore: OrganizationStore,
  ) { }

  ngOnInit() {
    this.organizationStore.setActive('eclAGMAMPl6l5lPov2ql'); // while organization does not stay active

    this.materialService.subscribeOnOrganizationMaterials$.pipe(takeWhile(() => this.isAlive)).subscribe();

    // query MaterialsByTemplate()
    this.materials$ = this.route.params.pipe(
      switchMap(params => this.materialQuery.selectAll())
    );
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}
