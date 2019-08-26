import { Component, OnInit } from '@angular/core';
import { DistributionRightForm } from './create.form';
import { staticModels, MovieQuery } from '@blockframes/movie';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'distribution-right-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistributionRightCreateComponent implements OnInit {
  public form = new DistributionRightForm();
  public movieTerritories: string[] = staticModels['TERRITORIES'].map(key => key.label);
  public movieMedias: string[] = staticModels['MEDIAS'].map(key => key.label);
  constructor(private query: MovieQuery) {}

  ngOnInit() { 
  }

  // function for second PR
  public addTerritories(territory: string) {
    this.form.get('territories');
  }
}
