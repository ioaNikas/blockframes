import { Component, OnInit } from '@angular/core';
import { WalletQuery } from '../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'wallet-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public address$: Observable<string>;

  constructor(private query: WalletQuery) {}

  ngOnInit() {
    this.address$ = this.query.select(state => state.address);
  }
}
