import { Key } from "libs/ethers/src/lib/key-manager/+state";
import { initial } from 'lodash';
import { Router } from "@angular/router";

export interface AddressParts {
  start: string;
  middle: string;
  end: string;
}

export function keyToAddressPart(key: Key, length: number): AddressParts {
  const { address } = JSON.parse(key.keyStore);
  return {start: address.slice(0, length), middle: address.slice(length, address.length - length), end: address.slice(-length)};
}

/**
 * Returns the base url, that you can concatenate with
 * the rest of the url where you want to navigate.
 * @example this.router.navigate([`${getBaseUrl(this.router)}/${movie.id}/edit`])
 */
export function getBaseUrl(router: Router) {
  return initial(router.url.split('/')).join('/');
}
