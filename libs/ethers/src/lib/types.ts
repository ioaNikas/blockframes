import { ContractFunction } from 'ethers';

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

export interface Tx {
  to: string; // address
  value: string; // uint256
  data: string; // bytes
}
export interface MetaTx extends Tx {
  nonce: string; // uint256
  gasPrice: string; // uint256
  gasToken: string; // address
  gasLimit: string; // uint256
  operationType: string; // uint8
}

export interface SignedMetaTx extends MetaTx {
  signatures: string; // bytes
}