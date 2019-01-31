import { Component, OnInit } from '@angular/core';
import { NgWallet } from '../+state';

@Component({
  selector: 'wallet-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private wallet: NgWallet) { }

  ngOnInit() {
  }


  public async create() {
    const mnemonic = await this.wallet.randomMnemonic('fr');
    this.wallet.fromMnemonic(mnemonic);
    this.wallet.save('password');
  }

}
