import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { Brand } from '../brand/brand';
import { TopBarLink } from './top-bar-link';

/** The header of every page: brand, primary destinations and the person's actions. */
@Component({
  selector: 'll-top-bar',
  imports: [Brand, RouterLink, RouterLinkActive],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBar {
  readonly homeLabel = input.required<string>();
  readonly brand = input<'compact' | 'full'>('compact');
  readonly links = input<readonly TopBarLink[]>([]);
  readonly navLabel = input('');
  readonly menuLabel = input('');
  readonly menuExpanded = input(false, { transform: booleanAttribute });
  readonly compact = input(false, { transform: booleanAttribute });

  readonly menuOpened = output<HTMLButtonElement>();

  protected matchOptions(link: TopBarLink): IsActiveMatchOptions {
    return {
      paths: link.exact ? 'exact' : 'subset',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };
  }
}
