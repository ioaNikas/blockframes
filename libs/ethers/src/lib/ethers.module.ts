import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { ethers, Contract, providers } from 'ethers';
import { Addresses } from './types';
import { NgWallet } from './wallet';
import { NETWORK, PROVIDER } from './tokens';

export function createProvider(network: keyof Addresses) {
  return ethers.getDefaultProvider(network);
}

export function createWeb3Provider(network: keyof Addresses) {
  return new providers.Web3Provider((<any>window).ethereum, network);
}

export function withMetaMask(): () => Promise<any> {
  return (): Promise<any> => {
    return (<any>window).ethereum.enable();
  };
}

@NgModule({})
export class EthersModule {
  static forRoot(network: keyof Addresses): ModuleWithProviders<EthersModule> {
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
        },
        NgWallet
      ]
    };
  }

  static withMetaMask(network: string): ModuleWithProviders<EthersModule> {
    return {
      ngModule: EthersModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: withMetaMask
        },
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
