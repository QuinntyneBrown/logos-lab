import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { SettingsProfilePage } from '../pages/settings-profile.page';
import { SignInPage } from '../pages/sign-in.page';

test.describe('Settings', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-015, L2-013 AC1
  test('a visitor is asked to sign in and comes back to Settings', async ({ page }) => {
    const signIn = new SignInPage(page);

    await page.goto('/settings/profile');

    await expect(page).toHaveURL('/sign-in?returnUrl=%2Fsettings%2Fprofile');
    await expect(signIn.heading).toBeVisible();
  });

  // L2-013 AC1 · sidebar-navigation AC-2, AC-11, page-header AC-1
  test('Settings opens Profile, in the settings layout with its navigation', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    const settings = new SettingsProfilePage(page);

    await settings.open('/settings');

    await expect(page).toHaveURL('/settings/profile');
    await expect(settings.sections()).toHaveText([
      'Profile',
      'Email and password',
      'Security',
      'Sessions',
      'Notifications',
      'Privacy and messaging',
      'Your data',
      'Blocked members',
    ]);
    await expect(settings.currentSection).toHaveText('Profile');
    await expect(settings.eyebrow).toHaveText('Settings');
    await expect(settings.heading).toHaveText('Profile');
    await expect(settings.sub).toHaveText(
      'How other members see you. Your email address, enrolments and progress are never shown on your profile.',
    );
    await expect(page).toHaveTitle('Profile settings - Logos Lab');
  });
});
