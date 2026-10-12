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

test.describe('Saving profile settings', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(({ api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/me/profile', profiles.miriam);
  });

  // L2-013 AC1 · form-layout AC-1, form-field AC-3
  test('a one-character name and a long bio are refused before saving', async ({ page, api }) => {
    const settings = new SettingsProfilePage(page);
    await settings.open();
    await settings.displayName.fill('M');
    await settings.bio.fill('a'.repeat(592));

    await settings.saveChanges();

    await expect(settings.summary).toBeFocused();
    await expect(settings.summary).toContainText('Two things to fix before you can save');
    await expect(settings.displayNameError).toHaveText(
      'Enter a display name of 2 to 50 characters. This one has 1.',
    );
    await expect(settings.bioError).toHaveText(
      'Shorten your bio to 500 characters. It has 592 now.',
    );
    await expect(settings.bioCounter).toHaveText('592 / 500');
    expect(api.requestsTo('PUT', '/me/profile')).toHaveLength(0);
  });

  // L2-013 AC1 · inline-message AC-1, button AC-4
  test('saving shows Saving…, then says the change is live and renames the member', async ({
    page,
    api,
  }) => {
    const saved = { ...profiles.miriam, displayName: 'Miriam J. Clarke', pronouns: 'she/her' };
    const release = api.hold('PUT', '/me/profile', saved);
    const settings = new SettingsProfilePage(page);
    await settings.open();
    await settings.displayName.fill(' Miriam J. Clarke ');
    await settings.pronouns.fill('she/her');

    await settings.saveChanges();

    await expect(settings.save).toHaveText('Saving…');
    await expect(settings.save).toHaveAttribute('aria-busy', 'true');
    expect(api.requestsTo('PUT', '/me/profile')[0].body).toEqual({
      displayName: 'Miriam J. Clarke',
      bio: profiles.miriam.bio,
      pronouns: 'she/her',
      profileVisible: true,
    });
    release();

    await expect(settings.saved).toHaveText('Profile saved. Members see the change straight away.');
    await expect(settings.saved).toHaveAttribute('role', 'status');
    await expect(settings.save).toHaveText('Save changes');
    await expect(settings.shell.accountButton).toHaveAccessibleName(/Miriam J\. Clarke/);
  });
});

test.describe('Profile settings failures', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(({ api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/me/profile', profiles.miriam);
  });

  // L2-013 AC1 · form-field AC-3
  test('a name the server refuses is shown on the field', async ({ page, api }) => {
    api.fail('PUT', '/me/profile', 422, 'validation-failed', {
      errors: [{ field: 'displayName', code: 'length' }],
    });
    const settings = new SettingsProfilePage(page);
    await settings.open();

    await settings.saveChanges();

    await expect(settings.displayNameError).toHaveText(
      'Enter a display name of 2 to 50 characters. This one has 13.',
    );
    await expect(settings.summary).toBeFocused();
  });

  // L2-013 AC1, L2-141 · alert AC-1
  test('a failed save keeps what was typed and says so', async ({ page, api }) => {
    api.fail('PUT', '/me/profile', 503);
    const settings = new SettingsProfilePage(page);
    await settings.open();
    await settings.pronouns.fill('she/her');

    await settings.saveChanges();

    await expect(settings.alert).toHaveAttribute('role', 'alert');
    await expect(settings.alert).toContainText("We couldn't save your profile");
    await expect(settings.pronouns).toHaveValue('she/her');
    await expect(settings.save).toHaveText('Save changes');
    await expect(settings.saved).toHaveCount(0);
  });
});
