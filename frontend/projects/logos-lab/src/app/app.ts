import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  Button,
  Footer,
  Icon,
  IconButton,
  Menu,
  MenuSection,
  SkipLink,
  TopBar,
} from '@logos-lab/components';
import { GlobalNavigation } from './global-navigation';
import { PRIMARY_LINKS } from './primary-links';
import { RouteFocus } from './route-focus';
import { Theme } from './theme';
import { themeButtonLabel, themeItems } from './theme-options';
import { ThemePreference } from './theme-preference';

@Component({
  selector: 'll-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CdkMenuTrigger,
    SkipLink,
    TopBar,
    Footer,
    Button,
    IconButton,
    Icon,
    Menu,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly primaryLinks = PRIMARY_LINKS;
  protected readonly navigation = inject(GlobalNavigation);
  protected readonly theme = inject(Theme);
  protected readonly themeSections = computed<readonly MenuSection[]>(() => [
    { label: $localize`:@@theme.menu:Theme`, items: themeItems(this.theme.preference()) },
  ]);
  protected readonly themeLabel = computed(() => themeButtonLabel(this.theme.preference()));
  protected readonly themeIcon = computed(() =>
    this.theme.preference() === 'light' ? 'sun' : 'moon',
  );

  protected chooseTheme(id: string): void {
    this.theme.choose(id as ThemePreference);
  }

  constructor() {
    inject(RouteFocus).start();
  }
}
