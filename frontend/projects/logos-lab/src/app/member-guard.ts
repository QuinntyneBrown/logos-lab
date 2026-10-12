import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { Session } from './session';

/**
 * Pages that exist only for a member. A visitor goes to sign in and comes back afterwards
 * (detailed design authorization/enforce-anonymous-boundaries, memberGuard).
 */
export const memberGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  return toObservable(inject(Session).member).pipe(
    filter((member) => member !== undefined),
    take(1),
    map((member) =>
      member ? true : router.createUrlTree(['/sign-in'], { queryParams: { returnUrl: state.url } }),
    ),
  );
};
