import { Component, OnInit } from '@angular/core';
import { NgWallet } from '@blockframes/ethers';

@Component({
  selector: 'script-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private wallet: NgWallet) {}

  ngOnInit() {}

  public async create() {
    const mnemonic = await this.wallet.randomMnemonic('fr');
    this.wallet.fromMnemonic(mnemonic);
    this.wallet.save('password');
  }
}
