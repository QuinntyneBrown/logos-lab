import { expect, test } from '../fixtures/test';
import { HomePage } from '../pages/home.page';

test.describe('App shell for a visitor', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-126 AC1 · skip-link AC-1, AC-2
  test('the first Tab reaches "Skip to main content", which moves focus to the main content', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();

    await home.shell.focusFirstElement();
    await expect(home.shell.focused()).toHaveText('Skip to main content');
    await expect(home.shell.skipLink).toBeInViewport();

    await home.shell.activateFocused();
    await expect(home.shell.main).toBeFocused();
  });

  // L2-127 AC1, L2-149 AC1 · top-bar AC-3, footer AC-1
  test('the page exposes one banner, main and contentinfo, and distinctly labelled navigation', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();

    expect(await home.shell.landmarkCounts()).toEqual({ banner: 1, main: 1, contentinfo: 1 });
    expect(await home.shell.navigationLabels()).toEqual(['Primary', 'Footer']);
    expect(await home.shell.documentLanguage()).toBe('en-CA');
  });

  // L2-131 AC1 · top-bar AC-1
  test('at 1440px the primary destinations, Sign in and Create account sit inline', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();

    expect(await home.shell.primaryLinkNames()).toEqual([
      'Explore',
      'Courses',
      'Events',
      'Experts',
      'Collections',
    ]);
    await expect(home.shell.primaryNav).toBeVisible();
    await expect(home.shell.signIn).toHaveAttribute('href', '/sign-in');
    await expect(home.shell.createAccount).toHaveAttribute('href', '/register');
    await expect(home.shell.menuButton).toBeHidden();
  });

  // footer AC-1
  test('the footer lists the policies, accessibility, cookie settings and the help address', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();

    expect(await home.shell.footerLinkNames()).toEqual([
      'Privacy',
      'Terms',
      'Community guidelines',
      'Accessibility',
      'Cookie settings',
      'help@logoslab.ca',
    ]);
  });
});

test.describe('Home hero', () => {
  // L2-001, L2-127 AC1, AC4 · hero AC-1, AC-2
  test('a visitor sees one main heading with a direct path to search and to the catalogue', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();

    await expect(home.heading).toHaveText('Think clearly about AI, rooted in faith.');
    expect(await home.headingCount()).toBe(1);
    expect(await home.title()).toBe('Home - Logos Lab');
    await expect(home.heroSearch).toBeVisible();
    await expect(home.heroSearchButton).toBeVisible();
    await expect(home.browseCatalogue).toHaveAttribute('href', '/explore');
  });

  // L2-120 AC3 · hero AC-3
  test('the hero photo reserves its size so it causes no layout shift', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await expect(home.heroPhoto).toHaveAttribute('width', '800');
    await expect(home.heroPhoto).toHaveAttribute('height', '800');
  });

  // L2-130 AC2 · hero AC-6, top-bar AC-10
  test('at 320px the page does not scroll horizontally', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const home = new HomePage(page);
    await home.open();

    expect(await home.shell.hasHorizontalScroll()).toBe(false);
  });
});
