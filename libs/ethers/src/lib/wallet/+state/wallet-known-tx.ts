import { Tx } from "../../types";

export function getMockTx(): Tx {
  return {
    to: '0x0000000000000000000000000000000000000000',
    value: '0x0',
    data: `0xca5cade8`
  }
}

export function getDeleteKeyTx(erc1077Address:string, pubKey: string): Tx {
  return {
    to: erc1077Address,
    value: '0x0',
    data: `0x81dd7b8e000000000000000000000000${pubKey.substr(2)}0000000000000000000000000000000000000000000000000000000000000001`
  }
}

export function getAddeKeyTx(erc1077Address:string, pubKey: string): Tx {
  return {
    to: erc1077Address,
    value: '0x0',
    data: `0xa2d39bdb000000000000000000000000${pubKey.substr(2)}0000000000000000000000000000000000000000000000000000000000000001`
  }
}

// TODO define "sign delivery" tx