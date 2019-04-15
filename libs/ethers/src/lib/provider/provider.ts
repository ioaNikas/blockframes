import { Injectable } from '@angular/core';
import { network } from '@env';

import { providers } from 'ethers';

@Injectable({ providedIn: 'root' })
export class Provider extends providers.EtherscanProvider {
  constructor() {
    super(network);
  }
}
