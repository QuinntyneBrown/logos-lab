import { CdkMenuTrigger } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemePreference } from '@logos-lab/api';
import {
  Avatar,
  Button,
  Footer,
  Icon,
  IconButton,
  Menu,
  MenuSection,
  SkipLink,
  TopBar,
} from '@logos-lab/components';
import { AccountBanner } from './account-banner/account-banner';
import { GlobalNavigation } from './global-navigation';
import { memberPlaces, SIGN_OUT_ID, signOutItem, staffPlaces } from './member-navigation';
import { PRIMARY_LINKS } from './primary-links';
import { CurrentShell } from './current-shell';
import { RouteFocus } from './route-focus';
import { Session } from './session';
import { SiteSearchField } from './site-search/site-search-field';
import { Theme } from './theme';
import { themeButtonLabel, themeItems } from './theme-options';

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
    Avatar,
    SiteSearchField,
    AccountBanner,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly primaryLinks = PRIMARY_LINKS;
  protected readonly navigation = inject(GlobalNavigation);
  protected readonly session = inject(Session);
  protected readonly theme = inject(Theme);

  protected readonly member = this.session.member;
  protected readonly shell = inject(CurrentShell).mode;
  protected readonly focused = computed(() => this.shell().kind === 'focused');
  protected readonly focusedAction = computed(() => {
    const shell = this.shell();
    return shell.kind === 'focused' ? shell.action : null;
  });

  /** The search row below XL, opened from the search icon. */
  protected readonly searchOpen = signal(false);
  private readonly searchButton = viewChild('searchButton', {
    read: ElementRef<HTMLButtonElement>,
  });

  protected openSearch(): void {
    this.searchOpen.set(true);
  }

  protected closeSearch(returnFocus: boolean): void {
    this.searchOpen.set(false);
    if (returnFocus) this.searchButton()?.nativeElement.focus();
  }
  protected readonly visitor = computed(() => this.member() === null);

  protected readonly themeSections = computed<readonly MenuSection[]>(() => [
    { label: $localize`:@@theme.menu:Theme`, items: themeItems(this.theme.preference()) },
  ]);
  protected readonly themeLabel = computed(() => themeButtonLabel(this.theme.preference()));
  protected readonly themeIcon = computed(() =>
    this.theme.preference() === 'light' ? 'sun' : 'moon',
  );

  protected readonly accountLabel = computed(
    () => $localize`:@@shell.accountButton:Your account, ${this.member()?.displayName ?? ''}:name:`,
  );
  protected readonly accountSections = computed<readonly MenuSection[]>(() => {
    const member = this.member();
    if (!member) return [];
    const staff = staffPlaces(member);
    return [
      { items: memberPlaces() },
      ...(staff.length ? [{ label: $localize`:@@staff.group:Staff`, items: staff }] : []),
      { label: $localize`:@@theme.menu:Theme`, items: themeItems(this.theme.preference()) },
      { items: [signOutItem()] },
    ];
  });

  constructor() {
    inject(RouteFocus).start();
    this.session.load();
    // A member's stored theme applies when they arrive (L2-133).
    effect(() => {
      const member = this.member();
      if (member) this.theme.adopt(member.themePreference);
    });
  }

  protected chooseTheme(id: string): void {
    this.theme.choose(id as ThemePreference, !!this.member());
  }

  protected chooseAccountItem(id: string): void {
    if (id === SIGN_OUT_ID) this.session.signOut();
    else if (id === 'system' || id === 'light' || id === 'dark') this.chooseTheme(id);
  }
}
