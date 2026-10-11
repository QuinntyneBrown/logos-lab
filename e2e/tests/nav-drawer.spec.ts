import { expect, test } from '../fixtures/test';
import { HomePage } from '../pages/home.page';
import { NavDrawerDialog } from '../pages/nav-drawer.dialog';

test.describe('Navigation drawer below LG', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  // L2-131 AC2 · top-bar AC-5
  test('at 375px the primary navigation is behind a collapsed "Menu" button', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await expect(home.shell.primaryNav).toBeHidden();
    await expect(home.shell.menuButton).toBeVisible();
    await expect(home.shell.menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  // L2-131 AC2 · drawer AC-1, AC-2, sidebar-navigation AC-1, top-bar AC-6
  test('"Menu" opens a modal drawer with the site navigation and the account actions', async ({
    page,
  }) => {
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();

    await home.shell.openMenu();

    await expect(drawer.dialog).toBeVisible();
    expect(await drawer.isModal()).toBe(true);
    expect(await drawer.headingLevel()).toBe('H2');
    expect(await drawer.groupLabels()).toEqual(['Browse', 'Display']);
    expect(await drawer.linkNames()).toEqual([
      'Explore',
      'Courses',
      'Events',
      'Experts',
      'Collections',
    ]);
    await expect(drawer.createAccount).toHaveAttribute('href', '/register');
    await expect(drawer.signIn).toHaveAttribute('href', '/sign-in');
    await expect(home.shell.menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  // L2-131 AC3 · drawer AC-4
  test('Escape closes the drawer and returns focus to "Menu"', async ({ page }) => {
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();
    await home.shell.openMenu();
    await expect(drawer.dialog).toBeVisible();

    await home.shell.pressEscape();

    await expect(drawer.dialog).toBeHidden();
    await expect(home.shell.menuButton).toBeFocused();
    await expect(home.shell.menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  // L2-131 AC3 · drawer AC-5
  test('"Close menu" closes the drawer and returns focus to "Menu"', async ({ page }) => {
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();
    await home.shell.openMenu();

    await drawer.close();

    await expect(drawer.dialog).toBeHidden();
    await expect(home.shell.menuButton).toBeFocused();
  });

  // L2-126 AC3 · drawer AC-3
  test('focus stays inside the open drawer', async ({ page }) => {
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();
    await home.shell.openMenu();
    await expect(drawer.dialog).toBeVisible();

    for (let i = 0; i < 12; i++) {
      await home.shell.tabForward();
      await expect(drawer.dialog.locator(':focus')).toHaveCount(1);
    }
  });

  // L2-131 AC2 · sidebar-navigation D-2
  test('choosing a destination closes the drawer and navigates', async ({ page }) => {
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();
    await home.shell.openMenu();

    await drawer.choose('Events');

    await expect(drawer.dialog).toBeHidden();
    await expect(page).toHaveURL('/events');
  });

  // L2-131 AC4
  test('widening past LG closes the drawer and shows the inline navigation', async ({ page }) => {
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();
    await home.shell.openMenu();
    await expect(drawer.dialog).toBeVisible();

    await home.shell.resizeTo(1280);

    await expect(drawer.dialog).toBeHidden();
    await expect(home.shell.primaryNav).toBeVisible();
    await expect(home.shell.menuButton).toBeHidden();
  });

  // L2-130 AC2 · drawer AC-8
  test('at 320px the open drawer fits without horizontal scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();
    await home.shell.openMenu();
    await expect(drawer.dialog).toBeVisible();

    expect(await home.shell.hasHorizontalScroll()).toBe(false);
  });
});
