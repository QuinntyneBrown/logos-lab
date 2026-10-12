import { DOCUMENT } from '@angular/common';
import { afterNextRender, inject, Injectable, Injector } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs';

/**
 * After an in-app navigation, moves focus to the new page's main heading (L2-126 AC5).
 * The first load is left alone, so the skip link stays the first focusable element.
 */
@Injectable({ providedIn: 'root' })
export class RouteFocus {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  start(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        skip(1),
      )
      .subscribe(() => afterNextRender(() => this.focusHeading(), { injector: this.injector }));
  }

  private focusHeading(): void {
    const heading = this.document.querySelector<HTMLElement>('main h1');
    if (!heading) return;
    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    heading.focus();
  }
}
