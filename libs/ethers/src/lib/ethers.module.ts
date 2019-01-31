import { NgModule, ModuleWithProviders } from '@angular/core';
import { ethers, providers } from 'ethers';
import { Addresses } from './types';
import { NETWORK, PROVIDER } from './tokens';

export function createProvider(network: keyof Addresses) {
  return ethers.getDefaultProvider(network);
}

export function createWeb3Provider(network: keyof Addresses) {
  return new providers.Web3Provider((<any>window).ethereum, network);
}


@NgModule({})
export class EthersModule {
  static useWallet(network: keyof Addresses): ModuleWithProviders<EthersModule> {
    return {
      ngModule: EthersModule,
      providers: [
        {
          provide: NETWORK,
          useValue: network
        },
        {
          provide: PROVIDER,
          deps: [NETWORK],
          useFactory: createProvider
        }
      ]
    };
  }

  static withMetaMask(network?: string): ModuleWithProviders<EthersModule> {
    return {
      ngModule: EthersModule,
      providers: [
        {
          provide: NETWORK,
          useValue: network
        },
        {
          provide: PROVIDER,
          deps: [NETWORK],
          useFactory: createWeb3Provider
        }
      ]
    };
  }
}
