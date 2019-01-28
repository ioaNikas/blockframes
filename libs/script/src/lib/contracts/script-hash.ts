import { Signer } from 'ethers';
import { Provider } from 'ethers/providers';
import { Addresses, INgContract, NgContract } from '@blockframes/ethers';

const addresses: Addresses = {
  ropsten: ''
};

interface ScriptHash extends INgContract {
  scriptsOwner(hash: string): Promise<string>;
  scriptsFrom(address: string): Promise<string[]>;
  addScript(hash: string): Promise<void>;
}

const abi = [
  'mapping(bytes32 => address) scriptsOwner',
  'function addScript(bytes32 _hash)',
  'function scriptsFrom(address _owner) public returns (bytes32[])'
];

export function scriptHash(provider: Signer | Provider, network: keyof Addresses) {
  const address = addresses[network];
  return new NgContract<ScriptHash>(address, abi, provider);
}
