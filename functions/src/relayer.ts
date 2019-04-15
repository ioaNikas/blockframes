import { Wallet, ContractFactory, Contract, utils, getDefaultProvider, providers } from 'ethers';
import { db } from './firebase';
import * as ERC1077 from './contracts/ERC1077.json';
import * as ENS_REGISTRY from './contracts/ENSRegistry.json';
import * as ENS_RESOLVER from './contracts/PublicResolver.json';

type TxResponse = providers.TransactionResponse;
type TxReceipt = providers.TransactionReceipt;

export interface Relayer {
  wallet: Wallet;
  erc1077Factory: ContractFactory;
  namehash: string;
  registry: Contract;
  resolver: Contract;
}

export const initRelayer = (config: any): Relayer => {
  let wallet = Wallet.fromMnemonic(config.relayer.mnemonic);
  const provider = getDefaultProvider(config.relayer.network);
  wallet = wallet.connect(provider);
  const erc1077Factory = new ContractFactory(ERC1077.abi, ERC1077.bytecode, wallet);
  const namehash = utils.namehash(config.relayer.basedomain);
  const registry = new Contract(config.relayer.registryaddress, ENS_REGISTRY.abi, wallet);
  const resolver = new Contract(config.relayer.resolveraddress, ENS_RESOLVER.abi, wallet);

  return <Relayer>{
    wallet,
    erc1077Factory,
    namehash,
    registry,
    resolver
  };
};

interface UserInfos { uid:string, username: string; key: string };

export const relayerCreateLogic = async (
  { uid, username, key }: UserInfos,
  config: any
) => {
  const relayer: Relayer = initRelayer(config);

  // check required params
  if (!username || !key) {
    throw new Error('"username" and "key" are mandatory parameters !');
  }

  try {
    utils.getAddress(key);
  } catch (error) {
    throw new Error('"key" should be a valid ethereum address !');
  }

  // compute needed values
  const fullName = `${username}.${config.relayer.basedomain}`;
  const hash = utils.keccak256(utils.toUtf8Bytes(username));

  try {
    // register the user ens username & deploy his erc1077 contract
    const registerTx: TxResponse = await relayer.registry.functions.setSubnodeOwner(
      relayer.namehash,
      hash,
      relayer.wallet.address
    );
    console.log(`tx sent (register) : ${registerTx.hash}`); // display tx to firebase logging
    const erc1077 = await relayer.erc1077Factory.deploy(key);
    console.log(`tx sent (deploy) : ${erc1077.deployTransaction.hash}`); // display tx to firebase logging
    const waitForRegister: Promise<TxReceipt> = registerTx.wait();
    const waitForDeploy: Promise<Contract> = erc1077.deployed();
    const [deployedErc1077] = await Promise.all([waitForDeploy, waitForRegister]);

    db.collection('users').doc(uid).update({identity: deployedErc1077.address}); // store contract address in firestore

    // set a resolver to the ens username
    const resolverTx: TxResponse = await relayer.registry.functions.setResolver(
      utils.namehash(fullName),
      relayer.resolver.address
    );
    console.log(`tx sent (setResolver) : ${resolverTx.hash}`); // display tx to firebase logging
    await resolverTx.wait();

    // link the erc1077 to the ens username
    const linkTx = await relayer.resolver.functions.setAddr(
      utils.namehash(fullName),
      deployedErc1077.address
    );
    console.log(`tx sent (setAddress) : ${linkTx.hash}`); // display tx to firebase logging

    return {
      username,
      key,
      register: registerTx.hash,
      deploy: erc1077.deployTransaction.hash,
      resolve: resolverTx.hash,
      link: linkTx.hash
    };
  } catch (error) {
    console.error(error);
  }
};

export const relayerSendLogic = async (
  { username, tx }: { username: string; tx: any },
  config: any
) => {
  const relayer: Relayer = initRelayer(config);
  // check required params
  if (!username || !tx) {
    throw new Error('"username" and "tx" are mandatory parameters !');
  }

  // compute needed values
  const fullName = `${username}.${config.relayer.basedomain}`;
  const erc1077 = new Contract(fullName, ERC1077.abi, relayer.wallet);

  // check if tx will be accepted by erc1077
  const canExecute: boolean = await erc1077.functions.canExecute(
    tx.to,
    tx.value,
    tx.data,
    tx.nonce,
    tx.gasPrice,
    tx.gasToken,
    tx.gasLimit,
    tx.operationType,
    tx.signatures
  );

  if (!canExecute) {
    throw new Error(
      'The transaction has not been sent beacause it will be be rejected by the ERC1077, this is probably a nonce or signatures problem.'
    );
  }

  const sendTx = await erc1077.functions.executeSigned(
    tx.to,
    tx.value,
    tx.data,
    tx.nonce,
    tx.gasPrice,
    tx.gasToken,
    tx.gasLimit,
    tx.operationType,
    tx.signatures
  );
  console.log(`tx sent (executeSigned) : ${sendTx.hash}`); // display tx to firebase logging

  const txReceipt = await sendTx.wait();
  return txReceipt;
};
