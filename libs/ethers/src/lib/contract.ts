import { Inject } from "@angular/core";
import { environment } from "@env/environment";
import { NgWallet } from "./wallet/+state";
import { Contract } from "ethers";
import { INgContract } from "./types";

/** A contract that is aware of its methods */
export class NgContract<T extends INgContract> extends Contract {
  functions: { [key in keyof T]: T[key] };
  constructor(name: string, abi: string[], wallet: NgWallet) {
    const address = environment.contracts[name]
    super(address, abi, wallet)
  }
}

/** Set the config for the contract */
export function ContractConfig(name: string, abi: string[]) {
  return function(constructor: any) {
    class ExtendedContract extends constructor {
      constructor(@Inject(NgWallet) wallet: NgWallet) {
        super(name, abi, wallet)
      }
    }
    return ExtendedContract as any
  }
}
