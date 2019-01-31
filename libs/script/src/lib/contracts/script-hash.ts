import { Injectable } from '@angular/core';
import { ContractConfig, NgContract, INgContract } from '@blockframes/ethers';

export interface ScriptHash extends INgContract {
  scriptsOwner(hash: string): Promise<string>;
  scriptsFrom(address: string): Promise<string[]>;
  addScript(hash: string): Promise<any>;
};

export const abi = [
  'function scriptsOwner(bytes32) public returns(address)',
  'function addScript(bytes32 _hash)',
  'function scriptsFrom(address _owner) public returns (bytes32[])'
];

@Injectable({ providedIn: 'root' })
@ContractConfig('scriptHash', abi)
export class ScriptHashContract extends NgContract<ScriptHash> {}
