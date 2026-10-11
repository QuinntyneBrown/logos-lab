import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApi } from './auth-api';

@Injectable()
export class HttpAuthApi implements AuthApi {
  private readonly http = inject(HttpClient);

  signOut(): Observable<void> {
    return this.http.delete<void>('/api/v1/auth/session');
  }
}
