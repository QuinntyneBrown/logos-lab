import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApi } from './auth-api';
import { SignInRequest } from './sign-in-request';
import { SignInResult } from './sign-in-result';

@Injectable()
export class HttpAuthApi implements AuthApi {
  private readonly http = inject(HttpClient);

  signIn(request: SignInRequest): Observable<SignInResult> {
    return this.http.post<SignInResult>('/api/v1/auth/sessions', request);
  }

  signOut(): Observable<void> {
    return this.http.delete<void>('/api/v1/auth/session');
  }
}
