import { expect, test } from '../fixtures/test';
import { homePage } from '../data/home';
import { members } from '../data/members';
import { AccountMenu } from '../pages/account-menu';
import { HomePage } from '../pages/home.page';
import { NavDrawerDialog } from '../pages/nav-drawer.dialog';
import { ThemeMenu } from '../pages/theme-menu';

test.describe('Signed-in top bar at LG', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(({ api }) => {
    api.respond('GET', '/home', homePage());
  });

  // L2-131 AC1 · avatar AC-1, menu AC-2
  test('a member sees their account button instead of Sign in and Create account', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    const home = new HomePage(page);
    await home.open();

    await expect(home.shell.accountButton).toHaveAccessibleName('Your account, Miriam Clarke');
    await expect(home.shell.accountButton.locator('img.avatar')).toHaveAttribute('alt', '');
    await expect(home.shell.signIn).toHaveCount(0);
    await expect(home.shell.createAccount).toHaveCount(0);
    await expect(home.shell.themeButton).toHaveCount(0);
  });

  // L2-016, L2-133 AC2 · menu AC-2
  test('the account menu names the member and lists their places, the theme and Sign out', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    const home = new HomePage(page);
    const menu = new AccountMenu(page);
    await home.open();

    await home.shell.openAccountMenu();

    await expect(menu.header).toContainText('Miriam Clarke');
    await expect(menu.header).toContainText('miriam.clarke@example.ca');
    expect(await menu.itemNames()).toEqual([
      'Dashboard',
      'My learning',
      'Saved',
      'Messages',
      'Settings',
      'Sign out',
    ]);
    expect(await menu.groupLabels()).toEqual(['Theme']);
    await expect(menu.item('Dashboard')).toHaveAttribute('href', '/dashboard');
  });

  // L2-016 AC (navigation never links to what the user cannot use)
  test('staff see the staff places their roles allow', async ({ page, api }) => {
    api.respond('GET', '/me', members.isaac);
    const home = new HomePage(page);
    const menu = new AccountMenu(page);
    await home.open();

    await home.shell.openAccountMenu();

    expect(await menu.groupLabels()).toEqual(['Staff', 'Theme']);
    expect(await menu.itemNames()).toEqual([
      'Dashboard',
      'My learning',
      'Saved',
      'Messages',
      'Settings',
      'Studio',
      'Review queue',
      'Moderation',
      'Admin',
      'Sign out',
    ]);
  });

  // L2-010
  test('signing out ends the session and shows the visitor top bar', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('DELETE', '/auth/session', undefined, 204);
    const home = new HomePage(page);
    const menu = new AccountMenu(page);
    await home.open();

    await home.shell.openAccountMenu();
    await menu.choose('Sign out');

    await expect(page).toHaveURL('/sign-in?signedOut=true');
    await expect(home.shell.signIn).toBeVisible();
    expect(api.requestsTo('DELETE', '/auth/session')).toHaveLength(1);
  });

  // L2-133 AC2
  test('a member’s theme choice is saved to their account', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('PATCH', '/me/preferences', { themePreference: 'dark' });
    const home = new HomePage(page);
    const menu = new AccountMenu(page);
    const theme = ThemeMenu.inGroup(page, menu.menu);
    await home.open();

    await home.shell.openAccountMenu();
    await theme.choose('Dark');

    expect(await home.shell.requestedTheme()).toBe('dark');
    await expect.poll(() => api.requestsTo('PATCH', '/me/preferences')).toHaveLength(1);
    expect(api.requestsTo('PATCH', '/me/preferences')[0].body).toEqual({ themePreference: 'dark' });
  });

  // L2-133 AC2, AC3
  test('a member’s stored theme applies when they arrive', async ({ page, api }) => {
    api.respond('GET', '/me', { ...members.miriam, themePreference: 'dark' });
    const home = new HomePage(page);
    await home.open();

    await expect.poll(() => home.shell.requestedTheme()).toBe('dark');
  });
});

test.describe('Signed-in drawer below LG', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  // L2-131 AC2 · sidebar-navigation AC-1
  test('the drawer holds the member’s places and Sign out instead of the account actions', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/home', homePage());
    api.respond('GET', '/me', members.miriam);
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    await home.open();

    await home.shell.openMenu();

    expect(await drawer.groupLabels()).toEqual(['Browse', 'You', 'Display', 'Account']);
    expect(await drawer.rowNames()).toEqual([
      'Explore',
      'Courses',
      'Events',
      'Experts',
      'Collections',
      'Dashboard',
      'Messages',
      'Settings',
      'Sign out',
    ]);
    await expect(drawer.createAccount).toHaveCount(0);
    await expect(drawer.signIn).toHaveCount(0);
  });
});
