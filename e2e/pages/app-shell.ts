import type { Locator, Page } from '@playwright/test';

/** The chrome every page shares: skip link, top bar and footer. Page objects compose it. */
export class AppShell {
  readonly skipLink: Locator;
  readonly main: Locator;
  readonly banner: Locator;
  readonly primaryNav: Locator;
  readonly footer: Locator;
  readonly footerNav: Locator;
  readonly signIn: Locator;
  readonly createAccount: Locator;
  readonly menuButton: Locator;
  readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.skipLink = page.locator('a.skip-link');
    this.main = page.locator('main#main');
    this.banner = page.getByRole('banner');
    this.primaryNav = this.banner.getByRole('navigation', { name: 'Primary' });
    this.footer = page.getByRole('contentinfo');
    this.footerNav = this.footer.getByRole('navigation', { name: 'Footer' });
    this.signIn = this.banner.locator('.header__signin');
    this.createAccount = this.banner.locator('.header__cta');
    this.menuButton = this.banner.locator('button.menu-btn');
    this.searchButton = this.banner.locator('.header__search-btn');
  }

  navLink(name: string): Locator {
    return this.primaryNav.getByRole('link', { name, exact: true });
  }

  async primaryLinkNames(): Promise<string[]> {
    return this.primaryNav.locator('.nav__link').allInnerTexts();
  }

  async footerLinkNames(): Promise<string[]> {
    return this.footerNav.locator('.footer__links > li').allInnerTexts();
  }

  async landmarkCounts() {
    return {
      banner: await this.page.getByRole('banner').count(),
      main: await this.page.getByRole('main').count(),
      contentinfo: await this.page.getByRole('contentinfo').count(),
    };
  }

  async navigationLabels(): Promise<string[]> {
    return this.page
      .locator('nav')
      .evaluateAll((navs) => navs.map((n) => n.getAttribute('aria-label') ?? ''));
  }

  async focusFirstElement(): Promise<void> {
    await this.page.locator('body').focus();
    await this.page.keyboard.press('Tab');
  }

  async activateFocused(): Promise<void> {
    await this.page.keyboard.press('Enter');
  }

  async tabForward(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) await this.page.keyboard.press('Tab');
  }

  focused(): Locator {
    return this.page.locator(':focus');
  }

  async documentLanguage(): Promise<string | null> {
    return this.page.locator('html').getAttribute('lang');
  }

  async hasHorizontalScroll(): Promise<boolean> {
    return this.page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
  }
}
