import { DialogConfig, DialogRef } from '@angular/cdk/dialog';

/**
 * What every modal dialog is opened with (docs/specs/components/dialog.md): named and described by
 * the ids the dialog's own template carries, closed only by its own controls, focus returned to the
 * control that opened it.
 */
export function modalConfig<D, R = unknown>(
  data: D,
  labelledBy: string,
  describedBy: string,
): DialogConfig<D, DialogRef<R>> {
  return {
    data,
    role: 'dialog',
    ariaModal: true,
    ariaLabelledBy: labelledBy,
    ariaDescribedBy: describedBy,
    disableClose: true,
    hasBackdrop: true,
    backdropClass: 'll-backdrop',
    panelClass: 'll-dialog-panel',
    maxWidth: '100vw',
    autoFocus: 'first-tabbable',
    restoreFocus: true,
    closeOnNavigation: true,
  };
}
