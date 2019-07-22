import { LocalTx, Tx, InformationMessage } from "../../types";

export function getMockTx(callback: (...args) => void): LocalTx {
  const tx = <Tx> {
    to: '0x0000000000000000000000000000000000000000',
    value: '0x0',
    data: `0xca5cade8`
  }
  const message = <InformationMessage> {
    headline: 'Congratulation !',
    subline: 'Your transaction was successfully sent to the Blockchain !',
    isError: false,
  };
  
  return <LocalTx> {...tx, message, callback};
}

export function getDeleteKeyTx(erc1077Address:string, pubKey: string, callback: (...args) => void): LocalTx {
  const tx = <Tx> {
    to: erc1077Address,
    value: '0x0',
    data: `0x81dd7b8e000000000000000000000000${pubKey.substr(2)}0000000000000000000000000000000000000000000000000000000000000001`
  }
  const message = <InformationMessage> {
    headline: 'Congratulation !',
    subline: 'Your key was successfully deleted !',
    isError: false,
  };

  return <LocalTx> {...tx, message, callback};
}

export function getAddeKeyTx(erc1077Address:string, pubKey: string, callback: (...args) => void): LocalTx {
  const tx = <Tx> {
    to: erc1077Address,
    value: '0x0',
    data: `0xa2d39bdb000000000000000000000000${pubKey.substr(2)}0000000000000000000000000000000000000000000000000000000000000001`
  }
  const message = <InformationMessage> {
    headline: 'Congratulation !',
    subline: 'Your key was successfully created !',
    isError: false,
  };

  return <LocalTx> {...tx, message, callback};
}

// TODO define "sign delivery" tx