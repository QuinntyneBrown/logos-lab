import { CdkMenu, CdkMenuGroup, CdkMenuItem, CdkMenuItemRadio } from '@angular/cdk/menu';
import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { MenuHeader } from './menu-header';
import { MenuSection } from './menu-section';

let nextId = 0;

/** Actions and choices for one control, built on the CDK menu. */
@Component({
  selector: 'll-menu',
  imports: [
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItem,
    CdkMenuItemRadio,
    NgTemplateOutlet,
    RouterLink,
    Icon,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly label = input<string | null>(null);
  readonly header = input<MenuHeader | null>(null);
  readonly sections = input.required<readonly MenuSection[]>();
  readonly inline = input(false, { transform: booleanAttribute });

  readonly itemSelected = output<string>();

  protected readonly idPrefix = `ll-menu-${nextId++}`;

  protected labelledBy(): string | null {
    if (this.label()) return null;
    const index = this.sections().findIndex((section) => section.label);
    return index < 0 ? null : `${this.idPrefix}-${index}`;
  }
}
