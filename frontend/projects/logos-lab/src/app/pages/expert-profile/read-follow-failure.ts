import { HttpErrorResponse } from '@angular/common/http';
import { retryAt } from '../../http/retry-at';
import { FollowStatus } from './follow-status';

/** Reads a failed follow: a `429` pauses the button until `Retry-After`, anything else is a failure. */
export function readFollowFailure(error: unknown, now: Date): FollowStatus {
  if (error instanceof HttpErrorResponse && error.status === 429) {
    return { kind: 'paused', until: retryAt(error.headers.get('Retry-After'), now, 60_000) };
  }
  return { kind: 'failed' };
}
