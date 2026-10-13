import { HttpErrorResponse } from '@angular/common/http';
import { SaveStatus } from './save-status';

/** Reads a failed save: the `saved-limit-reached` problem means Saved is full, anything else failed. */
export function readSaveFailure(error: unknown, title: string): SaveStatus {
  const full =
    error instanceof HttpErrorResponse &&
    error.status === 409 &&
    (error.error as { code?: string } | null)?.code === 'saved-limit-reached';
  return full ? { kind: 'full', title } : { kind: 'failed' };
}
