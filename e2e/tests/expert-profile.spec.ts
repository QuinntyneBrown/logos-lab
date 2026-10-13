import { abenaMensah, expertArticles, expertContent, meiLinChen } from '../data/expert-profiles';
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

  // L2-021 AC4 · tabs AC-10, AC-13
  test('the published items are in tabs, one for each type, each with its count', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.tabs).toHaveText([
      'Courses 1',
      'Videos 1',
      'Articles 3',
      'Collections 1',
      'Events 1',
    ]);
    await expect(profile.tab('Courses')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.tab('Videos')).toHaveAttribute('aria-selected', 'false');
    await expect(profile.cards).toHaveCount(1);
    await expect(profile.panel).toHaveAccessibleName('Courses 1');
  });

  // L2-021 AC4 · tabs AC-13
  test('choosing a tab shows that type and keeps focus on the tab', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=article', expertArticles());
    const profile = new ExpertProfilePage(page);
    await profile.open('/experts/abena-mensah');

    await profile.tab('Articles').click();

    await expect(page).toHaveURL('/experts/abena-mensah?type=article');
    await expect(profile.tab('Articles')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.cards).toHaveCount(3);
    await expect(profile.panel).toHaveAccessibleName('Articles 3');
    await expect(profile.tab('Articles')).toBeFocused();
  });

  // L2-126 · tabs AC-19, AC-20
  test('arrow keys move through the tabs and open each one', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=video', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=event', expertContent());
    const profile = new ExpertProfilePage(page);
    await profile.open('/experts/abena-mensah');
    await profile.tab('Courses').focus();

    await profile.pressKey('ArrowRight');
    await expect(profile.tab('Videos')).toBeFocused();
    await expect(profile.tab('Videos')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.tab('Courses')).toHaveAttribute('tabindex', '-1');

    await profile.pressKey('End');
    await expect(profile.tab('Events')).toBeFocused();
    await expect(profile.tab('Events')).toHaveAttribute('aria-selected', 'true');

    await profile.pressKey('ArrowRight');
    await expect(profile.tab('Courses')).toBeFocused();

    await profile.pressKey('ArrowLeft');
    await expect(profile.tab('Events')).toBeFocused();
  });

  // L2-021 AC4 · tabs AC-10
  test('an address with a type opens that tab, and an unknown type is ignored', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=article', expertArticles());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah?type=article');
    await expect(profile.tab('Articles')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.cards).toHaveCount(3);

    await profile.open('/experts/abena-mensah?type=podcast');
    await expect(profile.tab('Courses')).toHaveAttribute('aria-selected', 'true');
  });

  // L2-127 AC3 · skeleton AC-1, profile-header AC-14
  test('while the profile loads, the page is busy and announces it once', async ({ page, api }) => {
    const release = api.hold('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.heading).toHaveText('Loading profile…');
    await expect(profile.skeletonCards).toHaveCount(3);
    await expect(
      profile.loadingMessages.filter({ hasText: 'Loading published content…' }),
    ).toHaveCount(1);

    release();

    await expect(profile.heading).toHaveText('Dr. Abena Mensah');
    await expect(profile.skeletonCards).toHaveCount(0);
    await expect(profile.cards).toHaveCount(1);
  });

  // L2-021 AC4 · empty-state AC-1
  test('an expert with nothing published says so in place of the tabs', async ({ page, api }) => {
    api.respond('GET', '/experts/mei-lin-chen', meiLinChen);
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/mei-lin-chen');

    await expect(profile.heading).toHaveText('Dr. Mei Lin Chen');
    await expect(profile.tabs).toHaveCount(0);
    await expect(profile.emptyTitle).toHaveText('Nothing published yet');
    await expect(profile.emptyState).toContainText('Dr. Mei Lin Chen is new to Logos Lab.');
  });

  // L2-141 AC2 · empty-state AC-2
  test('a profile that fails to load offers another try', async ({ page, api }) => {
    api.fail('GET', '/experts/abena-mensah', 500);
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.emptyTitle).toHaveText("We couldn't load this profile");
    await expect(profile.breadcrumb.locator('[aria-current="page"]')).toHaveText('Expert');

    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    await profile.tryAgain.click();

    await expect(profile.heading).toHaveText('Dr. Abena Mensah');
    await expect(profile.cards).toHaveCount(1);
  });

  // L2-021 AC5 · error-page AC-1
  test('a slug that is not an expert shows the not-found page', async ({ page, api }) => {
    api.fail('GET', '/experts/nobody', 404, 'not-found');
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/nobody');

    await expect(profile.heading).toHaveText("We can't find that page");
    await expect(page).toHaveTitle('Page not found - Logos Lab');
  });

  // L2-141 AC2 · empty-state AC-2
  test('items that fail to load keep the tabs and offer another try', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.fail('GET', '/experts/abena-mensah/content?type=course', 500);
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.tabs).toHaveCount(5);
    await expect(profile.emptyTitle).toHaveText("We couldn't load these items");

    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    await profile.tryAgain.click();

    await expect(profile.cards).toHaveCount(1);
  });
});
