import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

const STORAGE_KEY = 'demoBay_auth';

export interface AuthState {
  isRegistered?: boolean;
  username?: string;
}

const initial: AuthState = {};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // For now the state is read from Storage
  // Once BE is readonly, change it with token decryption
  private _state$$ = new BehaviorSubject<AuthState>(initialAuthState());
  public state$ = this._state$$.asObservable().pipe(shareReplay(1));

  constructor() {}

  public register(username: string) {
    const curr = this._state$$.getValue();
    this._state$$.next({ ...curr, username, isRegistered: true });
  }
}

function initialAuthState() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? JSON.stringify(initial)
    ) as AuthState;
  } catch (e) {
    return initial;
  }
}
