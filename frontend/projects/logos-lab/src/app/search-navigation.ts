import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** Opens the search results for a query; every search field in the application uses it. */
@Injectable({ providedIn: 'root' })
export class SearchNavigation {
  private readonly router = inject(Router);

  search(query: string): void {
    void this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
