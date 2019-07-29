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
