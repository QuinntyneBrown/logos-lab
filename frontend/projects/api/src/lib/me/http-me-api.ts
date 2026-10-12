import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CurrentMember } from './current-member';
import { MeApi } from './me-api';

@Injectable()
export class HttpMeApi implements MeApi {
  private readonly http = inject(HttpClient);

  getMe(): Observable<CurrentMember | null> {
    return this.http
      .get<CurrentMember>('/api/v1/me')
      .pipe(
        catchError((error: unknown) =>
          error instanceof HttpErrorResponse && error.status === 401
            ? of(null)
            : throwError(() => error),
        ),
      );
  }
}
