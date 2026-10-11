import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarNavGroup } from './sidebar-nav-group';
import { SidebarNavItem } from './sidebar-nav-item';

/** Grouped destinations of one area: the drawer's site navigation, Settings, Admin, Moderation. */
@Component({
  selector: 'll-sidebar-nav',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarNavigation {
  readonly label = input.required<string>();
  readonly groups = input.required<readonly SidebarNavGroup[]>();
  readonly variant = input<'site' | 'settings'>('site');

  readonly itemSelected = output<string>();

  protected matchOptions(item: SidebarNavItem): IsActiveMatchOptions {
    return {
      paths: item.exact ? 'exact' : 'subset',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };
  }
}
