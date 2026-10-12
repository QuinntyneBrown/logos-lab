import { BreakpointObserver } from '@angular/cdk/layout';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { inject, Injectable, signal } from '@angular/core';

/** The LG boundary of the design system (top-bar CRD D-2). */
export const LG = '(min-width: 64rem)';

/**
 * Owns the navigation drawer: opens it from "Menu", mirrors its state for aria-expanded, and closes
 * it when the viewport widens past LG (L2-131).
 */
@Injectable({ providedIn: 'root' })
export class GlobalNavigation {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);
  private ref: Pick<DialogRef, 'close'> | null = null;
  private opening = false;

  readonly drawerOpen = signal(false);

  constructor() {
    inject(BreakpointObserver)
      .observe(LG)
      .subscribe((state) => {
        if (state.matches) this.ref?.close();
      });
  }

  async openDrawer(): Promise<void> {
    if (this.ref || this.opening) return;
    this.opening = true;
    const { NavDrawerDialog } = await import('./dialogs/nav-drawer/nav-drawer-dialog');
    this.opening = false;
    const ref = this.dialog.open(NavDrawerDialog, {
      ariaLabelledBy: 'drawer-title',
      ariaModal: true,
      backdropClass: 'll-backdrop',
      panelClass: 'll-drawer-panel--left',
      maxWidth: '100vw',
      positionStrategy: this.overlay.position().global().left('0').top('0'),
    });
    this.ref = ref;
    this.drawerOpen.set(true);
    ref.closed.subscribe(() => {
      this.ref = null;
      this.drawerOpen.set(false);
    });
  }
}
