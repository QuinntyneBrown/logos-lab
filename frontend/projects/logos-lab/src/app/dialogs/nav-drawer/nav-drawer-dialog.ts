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
import {
  memberPlaces,
  SIGN_OUT_ID,
  signOutItem,
  staffPlaces,
  toSidebarItems,
} from '../../member-navigation';
import { PRIMARY_LINKS } from '../../primary-links';
import { Session } from '../../session';
import { Theme } from '../../theme';
import { themeItems } from '../../theme-options';
import { ThemePreference } from '@logos-lab/api';

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

  private readonly session = inject(Session);
  protected readonly member = this.session.member;

  private readonly browse: SidebarNavGroup = {
    label: $localize`:@@drawer.browse:Browse`,
    items: PRIMARY_LINKS.map((link) => ({
      id: link.label,
      label: link.label,
      path: link.path,
      queryParams: link.queryParams,
    })),
  };

  protected readonly groups = computed<readonly SidebarNavGroup[]>(() => {
    const member = this.member();
    if (!member) return [this.browse];
    const staff = staffPlaces(member);
    return [
      this.browse,
      {
        label: $localize`:@@drawer.you:You`,
        items: toSidebarItems(
          memberPlaces().filter((p) => p.id !== 'my-learning' && p.id !== 'saved'),
        ),
      },
      ...(staff.length
        ? [{ label: $localize`:@@staff.group:Staff`, items: toSidebarItems(staff) }]
        : []),
    ];
  });

  protected readonly accountGroup: readonly SidebarNavGroup[] = [
    { label: $localize`:@@drawer.account:Account`, items: toSidebarItems([signOutItem()]) },
  ];

  private readonly theme = inject(Theme);
  protected readonly displayGroup: readonly SidebarNavGroup[] = [
    { label: $localize`:@@drawer.display:Display`, items: [] },
  ];
  protected readonly themeSections = computed<readonly MenuSection[]>(() => [
    { items: themeItems(this.theme.preference()) },
  ]);

  protected chooseTheme(id: string): void {
    this.theme.choose(id as ThemePreference, !!this.member());
  }

  protected chooseAccount(id: string): void {
    this.close();
    if (id === SIGN_OUT_ID) this.session.signOut();
  }

  protected close(): void {
    this.dialogRef.close();
  }
}
