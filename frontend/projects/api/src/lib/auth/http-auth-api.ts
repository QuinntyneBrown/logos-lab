import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApi } from './auth-api';
import { EmailVerification } from './email-verification';
import { RegisterRequest } from './register-request';
import { ResendResult } from './resend-result';
import { SignInRequest } from './sign-in-request';
import { SignInResult } from './sign-in-result';

@Injectable()
export class HttpAuthApi implements AuthApi {
  private readonly http = inject(HttpClient);

  signIn(request: SignInRequest): Observable<SignInResult> {
    return this.http.post<SignInResult>('/api/v1/auth/sessions', request);
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>('/api/v1/auth/registrations', request);
  }

  lookUpEmailVerification(token: string): Observable<EmailVerification> {
    return this.http.get<EmailVerification>(
      `/api/v1/auth/email-verifications/${encodeURIComponent(token)}`,
    );
  }

  confirmEmail(token: string): Observable<void> {
    return this.http.post<void>('/api/v1/auth/email-verifications', { token });
  }

  resendVerification(): Observable<ResendResult> {
    return this.http.post<ResendResult>('/api/v1/auth/email-verifications/resend', {});
  }

  resendVerificationForToken(token: string): Observable<ResendResult> {
    return this.http.post<ResendResult>('/api/v1/auth/email-verifications/resend', { token });
  }

  signOut(): Observable<void> {
    return this.http.delete<void>('/api/v1/auth/session');
  }
}
