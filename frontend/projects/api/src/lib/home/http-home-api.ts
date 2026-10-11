import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApi } from './home-api';
import { HomePageView } from './home-page-view';

@Injectable()
export class HttpHomeApi implements HomeApi {
  private readonly http = inject(HttpClient);

  getHome(): Observable<HomePageView> {
    return this.http.get<HomePageView>('/api/v1/home');
  }
}
