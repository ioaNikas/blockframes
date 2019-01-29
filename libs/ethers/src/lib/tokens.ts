import { InjectionToken } from '@angular/core';
import { providers } from 'ethers';

export const NETWORK = new InjectionToken<string>('ethers network');
export const PROVIDER = new InjectionToken<providers.BaseProvider>('ethers provider');
export const METAMASK = new InjectionToken<providers.Web3Provider>('Metamask provider');
