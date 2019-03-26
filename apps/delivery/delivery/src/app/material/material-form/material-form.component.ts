import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Material, MaterialService } from '../+state';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialFormComponent implements OnInit {

  @Input() material: Material;

  public form = new FormGroup({
    value: new FormControl(),
    description: new FormControl()
  });

  constructor(
    private service: MaterialService,
  ) { }

  ngOnInit() {
    this.form.setValue({value: this.material.value, description: this.material.description});
  }

  public deleteMaterial() {
    this.service.deleteMaterial(this.material.id);
  }

  public updateMaterial() {
    this.service.updateMaterial(this.material, this.form.value);
  }

  public addMaterial() {
    this.service.addMaterial(this.material.category);
  }


}
