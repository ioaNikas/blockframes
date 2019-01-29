import { NgModule, ModuleWithProviders, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { ethers, Contract, providers } from 'ethers';
import { Addresses } from './types';
import { NgWallet } from './wallet';
import { NETWORK, PROVIDER, METAMASK } from './tokens';

export function createProvider(network: string) {
  return ethers.getDefaultProvider(network);
}

export function withMetaMask(): () => Promise<any> {
  return (): Promise<any> => {
    return (<any>window).ethereum.enable();
  };
}

@NgModule({})
export class EthersModule {
  static forRoot(
    network: keyof Addresses,
    contracts?: { addresses: Addresses; abi: string[]; token: InjectionToken<Contract> }[]
  ): ModuleWithProviders<EthersModule> {
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
        NgWallet,
        ...contracts.map(({ token, addresses, abi }) => ({
          provide: token,
          deps: [NgWallet],
          useFactory: (wallet: NgWallet) => {
            const address = addresses[wallet.provider.network.name];
            return new Contract(address, abi, wallet);
          }
        }))
      ]
    };
  }

  static withMetaMask(network: string, contracts): ModuleWithProviders<EthersModule> {
    return {
      ngModule: EthersModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: withMetaMask
        },
        {
          provide: METAMASK,
          useFactory: () => new providers.Web3Provider((<any>window).ethereum, network)
        },
        ...contracts.map(({ token, addresses, abi }) => ({
          provide: token,
          deps: [METAMASK],
          useFactory: (provider: providers.Web3Provider) => {
            const address = addresses[provider.network.name];
            return new Contract(address, abi, provider.getSigner());
          }
        }))
      ]
    };
  }
}
