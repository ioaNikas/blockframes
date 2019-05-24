import { Injectable } from "@angular/core";

export interface IVault {

  get: (key: string) => Promise<string>;
  set: (key: string, value: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
  getAll: () => Promise<string[]>;
}


@Injectable({ providedIn: 'root' })
export class LocalStorageVault implements IVault {

  constructor(){}

  async get(key: string) {
    return localStorage.getItem(key)
  }
  async set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
  async delete(key: string) {
    return localStorage.removeItem(key);
  }
  async getAll() {
    const count = localStorage.length;
    return Array.from(Array(count).keys()).map(i => {
      const key = localStorage.key(i);
      return localStorage.getItem(key);
    });
  }
}
