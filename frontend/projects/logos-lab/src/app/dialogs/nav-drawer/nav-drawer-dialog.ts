import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Button,
  Drawer,
  Menu,
  MenuSection,
  SidebarNavGroup,
  SidebarNavigation,
} from '@logos-lab/components';
import { PRIMARY_LINKS } from '../../primary-links';
import { Theme } from '../../theme';
import { themeItems } from '../../theme-options';
import { ThemePreference } from '../../theme-preference';

/** The site navigation below LG (mock dialogs/nav-drawer). */
@Component({
  selector: 'll-nav-drawer-dialog',
  imports: [RouterLink, Drawer, SidebarNavigation, Menu, Button],
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

  private readonly theme = inject(Theme);
  protected readonly displayGroup: readonly SidebarNavGroup[] = [
    { label: $localize`:@@drawer.display:Display`, items: [] },
  ];
  protected readonly themeSections = computed<readonly MenuSection[]>(() => [
    { items: themeItems(this.theme.preference()) },
  ]);

  protected chooseTheme(id: string): void {
    this.theme.choose(id as ThemePreference);
  }

  protected close(): void {
    this.dialogRef.close();
  }
}
