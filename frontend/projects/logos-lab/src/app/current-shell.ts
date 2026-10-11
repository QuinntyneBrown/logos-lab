import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ShellMode } from './shell-mode';

const PRODUCT: ShellMode = { kind: 'product' };

/** The shell mode the current route asks for in its `shell` route data. */
@Injectable({ providedIn: 'root' })
export class CurrentShell {
  private readonly router = inject(Router);

  readonly mode = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => modeOf(this.router.routerState.snapshot.root)),
    ),
    { initialValue: PRODUCT },
  );
}

function modeOf(route: ActivatedRouteSnapshot): ShellMode {
  let current: ActivatedRouteSnapshot | null = route;
  let mode: ShellMode = PRODUCT;
  while (current) {
    const shell = current.data['shell'] as ShellMode | undefined;
    if (shell) mode = shell;
    current = current.firstChild;
  }
  return mode;
}
