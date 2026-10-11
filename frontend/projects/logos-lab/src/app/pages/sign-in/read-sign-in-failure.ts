import { HttpErrorResponse } from '@angular/common/http';
import { SignInFailure } from './sign-in-failure';

/** Reads the API's problem response into a failure the page can explain, or null for anything else. */
export function readSignInFailure(error: unknown, now: Date): SignInFailure | null {
  if (!(error instanceof HttpErrorResponse)) return null;
  const problem = (error.error ?? {}) as Record<string, string | undefined>;
  if (error.status === 401) return { kind: 'invalid-credentials' };
  if (error.status === 429) {
    const until = retryAt(error.headers.get('Retry-After'), now);
    const minutes = Math.max(1, Math.ceil((until.getTime() - now.getTime()) / 60_000));
    return { kind: 'paused', minutes, until };
  }
  if (error.status === 403 && problem['code'] === 'account-suspended' && problem['suspendedUntil'])
    return { kind: 'suspended', until: new Date(problem['suspendedUntil']) };
  if (
    error.status === 403 &&
    problem['code'] === 'account-deactivated' &&
    problem['deletionRequestedAt'] &&
    problem['purgeAt']
  )
    return {
      kind: 'deactivated',
      requestedAt: new Date(problem['deletionRequestedAt']),
      purgeAt: new Date(problem['purgeAt']),
    };
  return null;
}

/** `Retry-After` is either delay-seconds or an HTTP date; without one, the throttle's 15 minutes. */
function retryAt(header: string | null, now: Date): Date {
  const seconds = Number(header);
  if (header && Number.isFinite(seconds)) return new Date(now.getTime() + seconds * 1000);
  const date = header ? new Date(header) : null;
  if (date && !Number.isNaN(date.getTime())) return date;
  return new Date(now.getTime() + 15 * 60_000);
}
