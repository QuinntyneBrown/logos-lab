import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PreferencesApi } from './preferences-api';
import { ThemePreference } from './theme-preference';

@Injectable()
export class HttpPreferencesApi implements PreferencesApi {
  private readonly http = inject(HttpClient);

  updateTheme(themePreference: ThemePreference): Observable<void> {
    return this.http
      .patch<unknown>('/api/v1/me/preferences', { themePreference })
      .pipe(map(() => undefined));
  }
}
