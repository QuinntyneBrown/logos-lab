import { aiInThePulpit, aiInThePulpitProgress } from '../data/collections';
import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { CollectionPage } from '../pages/collection.page';
import { SignInRequiredDialog } from '../pages/sign-in-required.dialog';
import { UnfollowDialog } from '../pages/unfollow.dialog';

const path = '/collections/ai-in-the-pulpit';

test.describe('Collection page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-048 AC1 · page-header AC-1, breadcrumb AC-1
  test('shows the title, description, count and length', async ({ page, api }) => {
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(page).toHaveTitle('AI in the Pulpit - Logos Lab');
    await expect(collection.breadcrumb.getByRole('link', { name: 'Collections' })).toHaveAttribute(
      'href',
      '/explore?type=collection',
    );
    await expect(collection.breadcrumb.locator('[aria-current="page"]')).toHaveText(
      'AI in the Pulpit',
    );
    await expect(collection.eyebrow).toHaveText('Collection · 8 items · about 10 hours');
    await expect(collection.heading).toHaveText('AI in the Pulpit');
    await expect(collection.subtitle).toHaveText(aiInThePulpit.description);
  });

  // L2-048 AC1 · content-card AC-4
  test('lists the items in order, each numbered with its type', async ({ page, api }) => {
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.rows).toHaveCount(8);
    expect(await collection.typeLines()).toEqual([
      '1 · Article',
      '2 · Event',
      '3 · Video',
      '4 · Article',
      '5 · Module',
      '6 · Video',
      '7 · Article',
      '8 · Video',
    ]);
    await expect(collection.rows.first().locator('.content-card__title a')).toHaveText(
      'Five Questions to Ask Before Your Church Adopts AI',
    );
    await expect(collection.rows.first().locator('.content-card__title a')).toHaveAttribute(
      'href',
      '/articles/five-questions-to-ask-before-your-church-adopts-ai',
    );
  });

  // L2-048 AC1 · card AC-3
  test('names the curator and gives the facts about the collection', async ({ page, api }) => {
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.curator.getByRole('link')).toHaveText('Rev. Dr. Thomas Hale');
    await expect(collection.curator.getByRole('link')).toHaveAttribute(
      'href',
      '/experts/thomas-hale',
    );
    await expect(collection.facts).toHaveText([
      'Items8',
      'LengthAbout 10 hours',
      'UpdatedOct 2, 2026',
      'Followers412',
    ]);
  });

  // L2-048 AC3 · progress-bar AC-1, badge AC-1
  test('a member sees their progress through the collection and each item', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    api.respond('GET', '/me/collections/col-ai-in-the-pulpit/progress', aiInThePulpitProgress);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.progress).toBeVisible();
    await expect(collection.progressBar).toHaveAttribute('aria-valuenow', '38');
    await expect(collection.progress).toContainText('3 of 8 completed');
    await expect(collection.statuses).toHaveText([
      'Completed',
      'Not started',
      'Completed',
      'Completed',
      'Not passed · 64%, pass mark 80%',
      'Not started',
      'Not started',
      'In progress',
    ]);
    await expect(collection.rows.last().getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '52',
    );
  });

  // L2-048 AC3
  test('a visitor sees no progress and nothing is asked for it', async ({ page, api }) => {
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.rows).toHaveCount(8);
    await expect(collection.progress).toHaveCount(0);
    await expect(collection.statuses).toHaveCount(0);
    expect(api.requestsTo('GET', '/me/collections/col-ai-in-the-pulpit/progress')).toHaveLength(0);
  });

  // L2-141 AC2 · alert AC-1
  test('when progress cannot be loaded the items stay and the notice offers another try', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    api.fail('GET', '/me/collections/col-ai-in-the-pulpit/progress', 500);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.progressNotice).toContainText("Your progress isn't showing right now");
    await expect(collection.rows).toHaveCount(8);
    await expect(collection.statuses).toHaveCount(0);
    await expect(collection.progress).toHaveCount(0);

    api.respond('GET', '/me/collections/col-ai-in-the-pulpit/progress', aiInThePulpitProgress);
    await collection.tryAgain.click();

    await expect(collection.progress).toBeVisible();
    await expect(collection.progressNotice).toHaveCount(0);
  });

  // L2-050 AC1 · button AC-1, inline-message AC-1
  test('a member follows the collection and the follower count goes up', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    api.respond('PUT', '/me/follows/collections/col-ai-in-the-pulpit', { followerCount: 413 });
    const collection = new CollectionPage(page);
    await collection.open(path);
    await expect(collection.follow).toHaveText('Follow');
    await expect(collection.follow).toHaveAttribute('aria-pressed', 'false');

    await collection.follow.click();

    await expect(collection.follow).toHaveText('Following');
    await expect(collection.follow).toHaveAttribute('aria-pressed', 'true');
    await expect(collection.followStatus).toHaveText(
      "Following. You'll get one notification whenever items are added.",
    );
    await expect(collection.facts.last()).toHaveText('Followers413');
  });

  // L2-050 AC1 · dialog AC-2
  test('pressing Following asks first, and confirming removes the follow', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/collections/ai-in-the-pulpit', { ...aiInThePulpit, following: true });
    api.respond('DELETE', '/me/follows/collections/col-ai-in-the-pulpit', { followerCount: 411 });
    const collection = new CollectionPage(page);
    const unfollow = new UnfollowDialog(page);
    await collection.open(path);
    await expect(collection.follow).toHaveText('Following');

    await collection.follow.click();

    await expect(unfollow.title).toHaveText('Unfollow AI in the Pulpit?');
    await expect(unfollow.dialog).toHaveAccessibleDescription(
      "You'll stop getting notifications when items are added to AI in the Pulpit. You can follow again at any time.",
    );
    await expect(unfollow.keepFollowing).toBeFocused();

    await unfollow.unfollow.click();

    await expect(unfollow.dialog).toHaveCount(0);
    await expect(collection.follow).toHaveText('Follow');
    await expect(collection.follow).toBeFocused();
    await expect(collection.followStatus).toHaveText(
      'Unfollowed. You can follow again at any time.',
    );
    await expect(collection.facts.last()).toHaveText('Followers411');
  });

  // L2-015 AC1 · dialog AC-1
  test('a visitor who presses Follow is asked to sign in and sent nothing', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    const collection = new CollectionPage(page);
    const prompt = new SignInRequiredDialog(page);
    await collection.open(path);

    await collection.follow.click();

    await expect(prompt.title).toHaveText('Sign in to follow AI in the Pulpit');
    await expect(prompt.signIn).toHaveAttribute(
      'href',
      '/sign-in?returnUrl=%2Fcollections%2Fai-in-the-pulpit',
    );
    expect(api.requestsTo('PUT', '/me/follows/collections/col-ai-in-the-pulpit')).toHaveLength(0);
  });

  // L2-141 AC2 · alert AC-1
  test('a follow that fails says so and keeps Follow', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    api.fail('PUT', '/me/follows/collections/col-ai-in-the-pulpit', 500);
    const collection = new CollectionPage(page);
    await collection.open(path);

    await collection.follow.click();

    await expect(collection.followAlertTitle).toHaveText("We couldn't follow just now");
    await expect(collection.follow).toHaveText('Follow');
    await expect(collection.follow).toHaveAttribute('aria-pressed', 'false');
  });

  // L2-048 AC2 · empty-state AC-1
  test('a collection with no visible items says so and offers other collections', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/collections/ai-in-the-pulpit', {
      ...aiInThePulpit,
      items: [],
      itemCount: 0,
      totalMinutes: null,
    });
    api.respond('GET', '/me/collections/col-ai-in-the-pulpit/progress', {
      completed: 0,
      total: 0,
      items: [],
    });
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.eyebrow).toHaveText('Collection · 0 items');
    await expect(collection.emptyTitle).toHaveText('Nothing to show in this collection right now');
    await expect(collection.emptyState).toContainText(
      'Every item in AI in the Pulpit has been archived or is being reviewed.',
    );
    await expect(collection.emptyState.getByRole('link')).toHaveAttribute(
      'href',
      '/explore?type=collection',
    );
    await expect(collection.facts).toHaveText([
      'Items0',
      'LengthNone yet',
      'UpdatedOct 2, 2026',
      'Followers412',
    ]);
    await expect(collection.rows).toHaveCount(0);
    await expect(collection.progress).toHaveCount(0);
  });

  // L2-127 AC3 · skeleton AC-1
  test('while the collection loads the page is busy and announces it once', async ({
    page,
    api,
  }) => {
    const release = api.hold('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.heading).toHaveText('Collection');
    await expect(collection.loadingMessages).toHaveText(['Loading items…']);
    await expect(collection.skeletonCards.first()).toBeVisible();

    release();

    await expect(collection.heading).toHaveText('AI in the Pulpit');
    await expect(collection.skeletonCards).toHaveCount(0);
    await expect(collection.rows).toHaveCount(8);
  });

  // L2-141 AC2 · empty-state AC-2
  test('a collection that fails to load offers another try', async ({ page, api }) => {
    api.fail('GET', '/collections/ai-in-the-pulpit', 500);
    const collection = new CollectionPage(page);

    await collection.open(path);

    await expect(collection.emptyTitle).toHaveText("We couldn't load this collection");
    await expect(
      collection.shell.main.getByRole('link', { name: 'help@logoslab.ca' }),
    ).toHaveAttribute('href', 'mailto:help@logoslab.ca');

    api.respond('GET', '/collections/ai-in-the-pulpit', aiInThePulpit);
    await collection.tryAgain.click();

    await expect(collection.heading).toHaveText('AI in the Pulpit');
  });

  // L2-048 · error-page AC-1
  test('a slug that is not a published collection shows the not-found page', async ({
    page,
    api,
  }) => {
    api.fail('GET', '/collections/nothing-here', 404, 'not-found');
    const collection = new CollectionPage(page);

    await collection.open('/collections/nothing-here');

    await expect(collection.heading).toHaveText("We can't find that page");
    await expect(page).toHaveTitle('Page not found - Logos Lab');
  });
});
