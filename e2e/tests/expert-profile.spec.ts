import { abenaMensah, expertContent } from '../data/expert-profiles';
import { expect, test } from '../fixtures/test';
import { ExpertProfilePage } from '../pages/expert-profile.page';

test.describe('Expert profile', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-021 AC1 · profile-header AC-1, breadcrumb AC-1
  test('shows who the expert is: photo, name, title, facts and breadcrumb', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(page).toHaveTitle('Dr. Abena Mensah - Logos Lab');
    await expect(profile.breadcrumb.getByRole('link', { name: 'Experts' })).toHaveAttribute(
      'href',
      '/experts',
    );
    await expect(profile.breadcrumb.locator('[aria-current="page"]')).toHaveText(
      'Dr. Abena Mensah',
    );
    await expect(profile.heading).toHaveText('Dr. Abena Mensah');
    await expect(profile.photo).toHaveAttribute('alt', 'Dr. Abena Mensah');
    await expect(profile.subline).toHaveText(
      'Associate Professor of Systematic Theology, Kingsgate Theological College',
    );
    await expect(profile.facts).toHaveText(['1,284 followers', '7 published items']);
  });

  // L2-021 AC2, AC3 · prose AC-1, card AC-1, list AC-1
  test('shows the bio, the areas of expertise and the external links', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.bio).toContainText('Abena Mensah is a theologian who writes about');
    await expect(profile.bio).toContainText('Made, Not Manufactured');
    await expect(profile.bio.locator('em')).toHaveText('theological anthropology');
    expect(await profile.bioScriptRan()).toBe(false);
    await expect(profile.expertise.getByRole('link')).toHaveText([
      'The image of God and personhood',
      'Theology of technology',
      'Formation and education',
    ]);
    await expect(profile.expertise.getByRole('link').first()).toHaveAttribute(
      'href',
      '/topics/the-image-of-god-and-personhood',
    );
    const faculty = profile.elsewhere.getByRole('link', { name: /^Faculty page/ });
    await expect(faculty).toHaveAttribute('href', 'https://kingsgate.example.ca/faculty/mensah');
    await expect(faculty).toHaveAttribute('target', '_blank');
    await expect(faculty).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(faculty).toHaveAccessibleName('Faculty page (external site, opens in a new tab)');
  });
});
