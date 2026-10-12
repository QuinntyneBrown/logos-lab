import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountApi } from './account-api';
import { MemberProfile } from './member-profile';
import { ProfileUpdate } from './profile-update';

@Injectable()
export class HttpAccountApi implements AccountApi {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<MemberProfile> {
    return this.http.get<MemberProfile>('/api/v1/me/profile');
  }

  updateProfile(update: ProfileUpdate): Observable<MemberProfile> {
    return this.http.put<MemberProfile>('/api/v1/me/profile', update);
  }
}
