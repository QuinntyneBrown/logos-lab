import { DOCUMENT } from '@angular/common';
import { afterNextRender, inject, Injectable, Injector } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * After an in-app navigation to another page, moves focus to its main heading (L2-126 AC5).
 * The first load is left alone, so the skip link stays the first focusable element, and so is a
 * navigation that only changes the query of the same page, such as choosing a filter: the control
 * the member used keeps focus.
 */
@Injectable({ providedIn: 'root' })
export class RouteFocus {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  private previousPath: string | null = null;

  start(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const path = event.urlAfterRedirects.split(/[?#]/)[0];
        const moved = this.previousPath !== null && path !== this.previousPath;
        this.previousPath = path;
        if (moved) afterNextRender(() => this.focusHeading(), { injector: this.injector });
      });
  }

  private focusHeading(): void {
    const heading = this.document.querySelector<HTMLElement>('main h1');
    if (!heading) return;
    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    heading.focus();
  }
}
