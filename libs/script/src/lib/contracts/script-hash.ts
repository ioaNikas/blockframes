import { Contract } from 'ethers';
import { InjectionToken } from '@angular/core';

export type ScriptHash = Contract & {
  scriptsOwner(hash: string): Promise<string>;
  scriptsFrom(address: string): Promise<string[]>;
  addScript(hash: string): Promise<any>;
};

export const SCRIPTHASH = new InjectionToken<ScriptHash>('Script Hash Contract');

export const scriptHashContract = {
  token: SCRIPTHASH,
  addresses: {
    ropsten: '0x3a7bfeb49b2fd1399a38e748b3a18ab2a76b042a'
  },
  abi: [
    'function scriptsOwner(bytes32) public returns(address)',
    'function addScript(bytes32 _hash)',
    'function scriptsFrom(address _owner) public returns (bytes32[])'
  ]
};
