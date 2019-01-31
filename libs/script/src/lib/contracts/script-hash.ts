import { Contract, providers } from 'ethers';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { PROVIDER, NgWallet } from '@blockframes/ethers';

export type ScriptHash = Contract & {
  scriptsOwner(hash: string): Promise<string>;
  scriptsFrom(address: string): Promise<string[]>;
  addScript(hash: string): Promise<any>;
};

export const addresses = {
  ropsten: '0x3a7bfeb49b2fd1399a38e748b3a18ab2a76b042a'
};

export const abi = [
  'function scriptsOwner(bytes32) public returns(address)',
  'function addScript(bytes32 _hash)',
  'function scriptsFrom(address _owner) public returns (bytes32[])'
];

@Injectable({
  providedIn: 'root'
})
export class ScriptHashService extends Contract {
  constructor(wallet: NgWallet) {
    const address = addresses[wallet.provider.network.name];
    super(address, abi, wallet);
  }
}
