import { InjectionToken } from '@angular/core';
import { providers, ethers } from 'ethers';
import { environment } from '@env/environment';

export const NETWORK = new InjectionToken<string>('ethers network');
export const PROVIDER = new InjectionToken<providers.BaseProvider>('ethers provider', {
  providedIn: 'root',
  factory: () => ethers.getDefaultProvider(environment.network)
});
