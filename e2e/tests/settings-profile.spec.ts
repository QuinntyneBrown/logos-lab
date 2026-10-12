import { members } from '../data/members';
import { profiles } from '../data/profiles';
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

test.describe('Profile settings', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(({ api }) => {
    api.respond('GET', '/me', members.miriam);
  });

  // L2-013 AC1 · photo-edit AC-1, textarea AC-1, form-field AC-1, form-layout AC-9
  test('shows the photo, name, bio, pronouns and visibility to edit', async ({ page, api }) => {
    api.respond('GET', '/me/profile', profiles.miriam);
    const settings = new SettingsProfilePage(page);

    await settings.open();

    await expect(settings.photo).toHaveAttribute('alt', "Miriam Clarke's current photo");
    await expect(settings.changePhoto).toBeVisible();
    await expect(settings.displayName).toHaveValue('Miriam Clarke');
    await expect(settings.displayName).toHaveAccessibleDescription(
      '2 to 50 characters. Shown with your comments, cohort posts and certificates.',
    );
    await expect(settings.bio).toHaveValue(profiles.miriam.bio);
    await expect(settings.bioCounter).toHaveText('136 / 500');
    expect(await settings.helpAndCounterShareARow('bio')).toBe(true);
    await expect(settings.pronouns).toHaveValue('');
    await expect(settings.pronouns).toHaveAttribute(
      'placeholder',
      'For example, she/her or they/them',
    );
    await expect(settings.visible).toBeChecked();
    await expect(settings.save).toHaveText('Save changes');
    await expect(settings.viewProfile).toHaveAttribute('href', '/members/u-miriam');
  });

  // L2-013 AC1 · skeleton AC-1
  test('holds the form card with skeletons while the profile loads', async ({ page, api }) => {
    const release = api.hold('GET', '/me/profile', profiles.miriam);
    const settings = new SettingsProfilePage(page);

    await settings.open();

    await expect(settings.loading).toContainText('Loading your profile…');
    release();
    await expect(settings.displayName).toHaveValue('Miriam Clarke');
  });

  // L2-013 AC1, L2-141 · alert AC-1
  test('a profile that cannot load says so and offers to try again', async ({ page, api }) => {
    api.fail('GET', '/me/profile', 503);
    const settings = new SettingsProfilePage(page);

    await settings.open();

    await expect(settings.alert).toHaveAttribute('role', 'alert');
    await expect(settings.alert).toContainText("We couldn't load your profile");
    await expect(settings.alert).toContainText(
      "Your settings are safe; this page didn't reach our server. Check your connection, then try again. If it keeps happening, write to help@logoslab.ca.",
    );
    api.respond('GET', '/me/profile', profiles.miriam);
    await settings.tryAgain.click();
    await expect(settings.displayName).toHaveValue('Miriam Clarke');
  });
});
