import { Injectable, Inject } from '@angular/core';
import { Signer, providers } from 'ethers';
import { PROVIDER } from './tokens';

// TODO : Implements cryptographic methods

@Injectable()
export class NgWallet extends Signer {
  constructor(@Inject(PROVIDER) public provider: providers.BaseProvider) {
    super();
  }

  getAddress(): Promise<string> {
    throw new Error('Cannot get address. Connect to you wallet first');
  }
  sendTransaction(tx: providers.TransactionRequest): Promise<providers.TransactionResponse> {
    throw new Error('Cannot send Tx. Connect to you wallet first.');
  }

  signMessage(message: string): Promise<string> {
    throw new Error('Cannot sign Message. Connect to you wallet first.');
  }
}
