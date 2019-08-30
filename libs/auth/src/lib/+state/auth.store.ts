import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

//TODO add a good initial
export const PLACEHOLDER_AVATAR = 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg';

export interface User {
  uid: string;
  identity: {
    domain: string,
    address: string
  };
  balance: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  position: string;
  orgId: string;
  avatar: string;
}

export interface UserForm {
  email: string;
  pwd: string;
}

export interface AuthState {
  user: User;
  auth?: { emailVerified: boolean };
  form: UserForm;
  requestedRoute?: string;
  isEncrypting: boolean;
  isBalanceLoading: boolean;
}

export function createUser(user: Partial<User> = {}) {
  return {
    avatar: PLACEHOLDER_AVATAR,
    ...user
  } as User;
}

const initialState: AuthState = {
  user: null,
  form: {
    email: '',
    pwd: ''
  },
  isEncrypting: false,
  isBalanceLoading: false,
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(initialState);
  }
  updateUser(user: Partial<User>) {
    this.update(state => ({...state, user: ({...state.user, ...user})}));
  }
}
