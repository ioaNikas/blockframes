import { LocalTx, Tx } from "../../types";

/** Craft a transaction that will trigger the user ERC1077.deleteKey() function */
export function createDeleteKeyTx(erc1077Address:string, pubKey: string, callback: (...args) => void): LocalTx {
  const tx: Tx = {
    to: erc1077Address,
    value: '0x0',
    // deleteKey method hash (4 bytes) + arguments (key address (32 bytes) + purpose uint256 (32 bytes))
    data: `0x81dd7b8e000000000000000000000000${pubKey.substr(2)}0000000000000000000000000000000000000000000000000000000000000001`
  }

  return {...tx, callback};
}

/** Craft a transaction that will trigger the user ERC1077.addKey() function */
export function createAddKeyTx(erc1077Address:string, pubKey: string, callback: (...args) => void): LocalTx {
  const tx: Tx = {
    to: erc1077Address,
    value: '0x0',
    // addKey method hash (4 bytes) + arguments (key address (32 bytes) + purpose uint256 (32 bytes))
    data: `0xa2d39bdb000000000000000000000000${pubKey.substr(2)}0000000000000000000000000000000000000000000000000000000000000001`
  }
  
  return {...tx, callback};
}

// TODO define "sign delivery" tx
