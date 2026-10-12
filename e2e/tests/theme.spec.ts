import { expect, test } from '../fixtures/test';
import { HomePage } from '../pages/home.page';
import { NavDrawerDialog } from '../pages/nav-drawer.dialog';
import { ThemeMenu } from '../pages/theme-menu';

test.describe('Theme on a first visit', () => {
  // L2-133 AC1
  test('the theme follows the device preference', async ({ page }) => {
    const home = new HomePage(page);
    await page.emulateMedia({ colorScheme: 'light' });
    await home.open();
    const light = await home.shell.canvasColour();

    await page.emulateMedia({ colorScheme: 'dark' });

    expect(await home.shell.requestedTheme()).toBeNull();
    expect(await home.shell.canvasColour()).not.toBe(light);
  });
});

test.describe('Theme menu at LG', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-133 AC2 · menu AC-1
  test('the theme button opens a menu of the three choices, following the device by default', async ({
    page,
  }) => {
    const home = new HomePage(page);
    const theme = new ThemeMenu(page);
    await home.open();
    await expect(home.shell.themeButton).toHaveAccessibleName('Theme: match my device');

    await home.shell.openThemeMenu();

    expect(await theme.optionNames()).toEqual(['Match my device', 'Light', 'Dark']);
    await expect(theme.option('Match my device')).toHaveAttribute('aria-checked', 'true');
    await expect(theme.option('Dark')).toHaveAttribute('aria-checked', 'false');
  });

  // L2-133 AC2 · menu AC-4
  test('choosing Dark applies it at once and checks it next time', async ({ page }) => {
    const home = new HomePage(page);
    const theme = new ThemeMenu(page);
    await page.emulateMedia({ colorScheme: 'light' });
    await home.open();
    const light = await home.shell.canvasColour();

    await home.shell.openThemeMenu();
    await theme.choose('Dark');

    expect(await home.shell.requestedTheme()).toBe('dark');
    expect(await home.shell.canvasColour()).not.toBe(light);
    await expect(theme.menu).toBeHidden();
    await expect(home.shell.themeButton).toHaveAccessibleName('Theme: dark');
    await home.shell.openThemeMenu();
    await expect(theme.option('Dark')).toHaveAttribute('aria-checked', 'true');
    await expect(theme.option('Match my device')).toHaveAttribute('aria-checked', 'false');
  });

  // L2-133 AC3
  test('a stored choice is applied before the application starts', async ({ page }) => {
    const home = new HomePage(page);
    const theme = new ThemeMenu(page);
    await home.open();
    await home.shell.openThemeMenu();
    await theme.choose('Dark');

    await page.route(/\/main-[^/]*\.js$|\/main\.js$/, (route) => route.abort());
    await page.reload();

    expect(await home.shell.requestedTheme()).toBe('dark');
  });

  // L2-133 AC2
  test('choosing "Match my device" follows the device again', async ({ page }) => {
    const home = new HomePage(page);
    const theme = new ThemeMenu(page);
    await home.open();
    await home.shell.openThemeMenu();
    await theme.choose('Light');
    expect(await home.shell.requestedTheme()).toBe('light');

    await home.shell.openThemeMenu();
    await theme.choose('Match my device');
    await page.reload();

    expect(await home.shell.requestedTheme()).toBeNull();
  });

  // L2-126 · menu AC-5
  test('the menu works from the keyboard and Escape returns focus to the theme button', async ({
    page,
  }) => {
    const home = new HomePage(page);
    const theme = new ThemeMenu(page);
    await home.open();
    await home.shell.themeButton.focus();

    await page.keyboard.press('Enter');
    await expect(theme.focusedOption()).toHaveText('Match my device');
    await page.keyboard.press('ArrowDown');
    await expect(theme.focusedOption()).toHaveText('Light');
    await page.keyboard.press('Escape');

    await expect(theme.menu).toBeHidden();
    await expect(home.shell.themeButton).toBeFocused();
  });
});

test.describe('Theme in the drawer below LG', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  // L2-133 AC2 · menu AC-3
  test('the drawer holds the theme choices and applies one at once', async ({ page }) => {
    const home = new HomePage(page);
    const drawer = new NavDrawerDialog(page);
    const theme = new ThemeMenu(page, drawer.dialog);
    await home.open();
    await home.shell.openMenu();

    expect(await drawer.groupLabels()).toEqual(['Browse', 'Display']);
    expect(await theme.optionNames()).toEqual(['Match my device', 'Light', 'Dark']);
    await theme.choose('Dark');

    expect(await home.shell.requestedTheme()).toBe('dark');
    await expect(theme.option('Dark')).toHaveAttribute('aria-checked', 'true');
  });
});
