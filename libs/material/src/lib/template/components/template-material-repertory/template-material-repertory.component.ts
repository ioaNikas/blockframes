import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Material } from '../../../material/+state';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'template-material-repertory',
  templateUrl: './template-material-repertory.component.html',
  styleUrls: ['./template-material-repertory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateMaterialRepertoryComponent {
  @Input()
  set materials(materials: Material[]) {
    this.dataSource = new MatTableDataSource(materials);
    this.dataSource.sort = this.sort;
  }

  @Output() editing = new EventEmitter<string>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSource: MatTableDataSource<Material>;
  public displayedColumns: string[] = ['value', 'description', 'category', 'price', 'action'];

}
