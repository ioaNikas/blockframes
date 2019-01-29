import { ContractFunction, Contract } from 'ethers';

export interface INgContract {
  [methods: string]: ContractFunction;
}

export interface Addresses {
  mainnet?: string;
  ropsten?: string;
  kovan?: string;
  rinkeby?: string;
  local?: string;
}

export class NgContract<T extends INgContract> extends Contract {
  functions: { [key in keyof T]: T[key] };
}
