import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../../template/+state/template.model';
import { Movie } from 'libs/movie/src/lib/movie/+state/movie.model';
import { MatDialogRef } from '@angular/material';
import { TemplateService} from '../../template/+state/template.service';
import { TemplateQuery } from '../../template/+state/template.query';
import { TemplateStore } from '../../template/+state/template.store';
import { MaterialService } from '../../material/+state/material.service';
import { MovieQuery } from '@blockframes/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'delivery-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePickerComponent implements OnInit {

  public templates$: Observable<Template[]>;
  public movie$: Observable<Movie>;

  constructor(
    public dialogRef: MatDialogRef<TemplatePickerComponent>,
    public templateService: TemplateService,
    public materialService: MaterialService,
    public templateQuery: TemplateQuery,
    public templateStore: TemplateStore,
    public movieQuery: MovieQuery,
    public router: Router,
    ) {}

  ngOnInit() {
    this.templateService.subscribeOnOrganizationTemplates$.subscribe(); //todo unsubscribe
    this.materialService.subscribeOnOrganizationMaterials$.subscribe(); //todo unsubscribe

    this.templates$ = this.templateQuery.selectAll();
    this.movie$ = this.movieQuery.selectActive();
  }

  public selectTemplate(templateId) {
    this.templateStore.setActive(templateId);
  }

  public close() {
    this.dialogRef.close();
  }

  public goToForm(movie) {
    this.router.navigate([`delivery/${movie.id}/delivery-form`]);
    this.dialogRef.close();
  }
}
