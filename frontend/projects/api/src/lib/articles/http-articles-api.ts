import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './article';
import { ArticlesApi } from './articles-api';

@Injectable()
export class HttpArticlesApi implements ArticlesApi {
  private readonly http = inject(HttpClient);

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(`/api/v1/articles/${encodeURIComponent(slug)}`);
  }
}
