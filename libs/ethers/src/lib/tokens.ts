import { InjectionToken } from '@angular/core';
import { providers, ethers } from 'ethers';
import { network } from '@env';

export const NETWORK = new InjectionToken<string>('ethers network');
export const PROVIDER = new InjectionToken<providers.BaseProvider>('ethers provider', {
  providedIn: 'root',
  factory: () => ethers.getDefaultProvider(network)
});
