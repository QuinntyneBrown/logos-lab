import { HttpErrorResponse } from '@angular/common/http';
import { retryAt } from '../../http/retry-at';
import { SearchResultsState } from './search-results-state';

/** Reads a failed search: a `429` pauses the page until `Retry-After`, anything else is a failure. */
export function readSearchFailure(error: unknown, now: Date): SearchResultsState {
  if (error instanceof HttpErrorResponse && error.status === 429) {
    const until = retryAt(error.headers.get('Retry-After'), now, 60_000);
    const seconds = Math.max(1, Math.ceil((until.getTime() - now.getTime()) / 1000));
    return { kind: 'paused', until, seconds };
  }
  return { kind: 'failed' };
}
