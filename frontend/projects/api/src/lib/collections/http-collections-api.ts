import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from './collection';
import { CollectionProgress } from './collection-progress';
import { CollectionsApi } from './collections-api';

@Injectable()
export class HttpCollectionsApi implements CollectionsApi {
  private readonly http = inject(HttpClient);

  getCollection(slug: string): Observable<Collection> {
    return this.http.get<Collection>(`/api/v1/collections/${encodeURIComponent(slug)}`);
  }

  getMyProgress(collectionId: string): Observable<CollectionProgress> {
    return this.http.get<CollectionProgress>(
      `/api/v1/me/collections/${encodeURIComponent(collectionId)}/progress`,
    );
  }
}
