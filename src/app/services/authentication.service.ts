import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  map,
  shareReplay,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { API_BASE_URL } from '../tokens';

export interface RegisterPostBody {
  firstName: string;
  lastName: string;
  email: string;
}
export type AuthTokenState = Partial<RegisterPostBody>;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenDetails$$ = new BehaviorSubject<Partial<AuthTokenState>>({});
  private registrationInProgress$$ = new BehaviorSubject<boolean>(false);
  private registrationError$$ = new Subject<Nullable<string>>();

  public state$ = combineLatest([
    this.tokenDetails$$,
    this.registrationInProgress$$,
    this.registrationError$$.pipe(startWith(undefined)),
  ]).pipe(
    map(([token, registrationInProgress, registrationError]) => ({
      ...token,
      registrationInProgress,
      registrationError,
    })),
    shareReplay(1)
  );

  constructor(
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private http: HttpClient
  ) {}

  public async register(body: RegisterPostBody) {
    return firstValueFrom(this.registerRequest(body));
  }

  private registerRequest(body: RegisterPostBody) {
    this.registrationInProgress$$.next(true);
    this.registrationError$$.next(undefined);
    return this.http.post(`${this.apiBaseUrl}/users`, body).pipe(
      tap({
        next: (r) => {
          this.registrationInProgress$$.next(false);
          this.tokenDetails$$.next(r);
        },
        error: (e) => {
          this.registrationError$$.next(e);
          this.registrationInProgress$$.next(false);
        },
      })
    );
  }
}
