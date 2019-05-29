import { Key } from "libs/ethers/src/lib/key-manager/+state";

export function keyToAddressPart(key: Key, length: number) {
  const { address } = JSON.parse(key.keyStore);
  return {start: address.slice(0, length), end: address.slice(-length)};
}