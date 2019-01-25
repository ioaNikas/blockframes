import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  islogged: boolean;
  loading: boolean;
  user: {
    uid: string;
    email: string;
  };
}

export function createInitialState(): AuthState {
  return {
    islogged: false,
    loading: false,
    user: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
