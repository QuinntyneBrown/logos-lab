import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ContentType } from '../content/content-type';
import { SavedItemsApi } from './saved-items-api';

@Injectable()
export class HttpSavedItemsApi implements SavedItemsApi {
  private readonly http = inject(HttpClient);

  save(type: ContentType, itemId: string): Observable<void> {
    return this.http.put<void>(this.itemUrl(type, itemId), null).pipe(map(() => undefined));
  }

  unsave(type: ContentType, itemId: string): Observable<void> {
    return this.http.delete<void>(this.itemUrl(type, itemId)).pipe(map(() => undefined));
  }

  private itemUrl(type: ContentType, itemId: string): string {
    return `/api/v1/me/saved-items/${type}/${encodeURIComponent(itemId)}`;
  }
}
