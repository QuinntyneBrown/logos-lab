import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, Drawer, SidebarNavGroup, SidebarNavigation } from '@logos-lab/components';
import { PRIMARY_LINKS } from '../../primary-links';

/** The site navigation below LG (mock dialogs/nav-drawer). */
@Component({
  selector: 'll-nav-drawer-dialog',
  imports: [RouterLink, Drawer, SidebarNavigation, Button],
  templateUrl: './nav-drawer-dialog.html',
  styleUrl: './nav-drawer-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavDrawerDialog {
  protected readonly dialogRef = inject(DialogRef);

  protected readonly groups: readonly SidebarNavGroup[] = [
    {
      label: $localize`:@@drawer.browse:Browse`,
      items: PRIMARY_LINKS.map((link) => ({
        id: link.label,
        label: link.label,
        path: link.path,
        queryParams: link.queryParams,
      })),
    },
  ];

  protected close(): void {
    this.dialogRef.close();
  }
}
