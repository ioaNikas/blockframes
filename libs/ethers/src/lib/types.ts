import { ContractFunction, Contract } from 'ethers';
import { Inject, Type, Injectable } from '@angular/core';
import { NgWallet } from './wallet/+state';
import { environment } from '@env/environment';
import { PROVIDER } from './tokens';

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

