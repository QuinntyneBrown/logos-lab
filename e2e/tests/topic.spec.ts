import { catalogueItems } from '../data/catalogue';
import { liturgyAndWorship, theologyOfTechnology, topicContent } from '../data/topics';
import { expect, test } from '../fixtures/test';
import { TopicPage } from '../pages/topic.page';

test.describe('Topic page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-005 AC1 · breadcrumb AC-1, page-header AC-1, person-list AC-1
  test('shows the topic, its experts and its newest items', async ({ page, api }) => {
    api.respond('GET', '/topics/theology-of-technology', theologyOfTechnology);
    api.respond('GET', '/topics/theology-of-technology/content', topicContent());
    const topic = new TopicPage(page);

    await topic.open('/topics/theology-of-technology');

    await expect(page).toHaveTitle('Theology of technology - Logos Lab');
    await expect(topic.breadcrumb.getByRole('link', { name: 'Explore' })).toHaveAttribute(
      'href',
      '/explore',
    );
    await expect(topic.breadcrumb.locator('[aria-current="page"]')).toHaveText(
      'Theology of technology',
    );
    await expect(topic.eyebrow).toHaveText('Topic');
    await expect(topic.heading).toHaveText('Theology of technology');
    await expect(topic.lead).toContainText('How Christian thought understands tools');
    await expect(topic.sub).toHaveText('41 published items from 5 experts and Logos Lab.');
    await expect(topic.expertRows).toHaveCount(5);
    await expect(topic.expertRows.first()).toContainText('Dr. Lucía Ortega');
    await expect(topic.expertRows.first()).toContainText('Church historian · 4 items here');
    await expect(topic.expertRows.first().getByRole('link')).toHaveAttribute(
      'href',
      '/experts/lucia-ortega',
    );
    await expect(topic.count).toHaveText('Showing 1–24 of 41 items');
    await expect(topic.cards).toHaveCount(24);
    await expect(topic.card(0).titleLink).toHaveText('Imago Dei in an Age of Machines');
  });

  // L2-005 AC1 · pagination AC-1
  test('the items are paged, 24 to a page, and the pager is named for the topic', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/topics/theology-of-technology', theologyOfTechnology);
    api.respond('GET', '/topics/theology-of-technology/content', topicContent());
    api.respond(
      'GET',
      '/topics/theology-of-technology/content?page=2',
      topicContent({ page: 2, items: catalogueItems.slice(0, 17) }),
    );
    const topic = new TopicPage(page);
    await topic.open('/topics/theology-of-technology');

    await expect(topic.pager).toHaveAttribute('aria-label', 'Pages of Theology of technology');
    await expect(topic.pagerText).toHaveText('Page 1 of 2');

    await topic.goToPage(2);

    await expect(page).toHaveURL('/topics/theology-of-technology?page=2');
    await expect(topic.pagerText).toHaveText('Page 2 of 2');
    await expect(topic.count).toHaveText('Showing 25–41 of 41 items');
    await expect(topic.cards).toHaveCount(17);
  });

  // L2-127 AC3 · skeleton AC-1, person-list AC-9
  test('while the topic and its items load, each part is busy and announces it once', async ({
    page,
    api,
  }) => {
    const releaseTopic = api.hold('GET', '/topics/theology-of-technology', theologyOfTechnology);
    const releaseContent = api.hold(
      'GET',
      '/topics/theology-of-technology/content',
      topicContent(),
    );
    const topic = new TopicPage(page);

    await topic.open('/topics/theology-of-technology');

    await expect(topic.heading).toHaveText('Loading topic…');
    await expect(topic.skeletonPeople).toHaveCount(3);

    releaseTopic();

    await expect(topic.heading).toHaveText('Theology of technology');
    await expect(topic.sub).toHaveText('Loading items…');
    await expect(topic.count).toHaveText('Loading…');
    await expect(topic.skeletonCards).toHaveCount(6);
    await expect(
      topic.loadingMessages.filter({ hasText: 'Loading items in Theology of technology…' }),
    ).toHaveCount(1);
    await expect(topic.expertRows).toHaveCount(5);

    releaseContent();

    await expect(topic.cards).toHaveCount(24);
    await expect(topic.skeletonCards).toHaveCount(0);
  });

  // L2-005 AC3 · empty-state AC-1
  test('a topic with nothing published says so and points to the catalogue', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/topics/liturgy-and-worship', liturgyAndWorship);
    api.respond(
      'GET',
      '/topics/liturgy-and-worship/content',
      topicContent({ items: [], total: 0, pageCount: 0 }),
    );
    const topic = new TopicPage(page);

    await topic.open('/topics/liturgy-and-worship');

    await expect(topic.sub).toHaveText('No published items yet.');
    await expect(topic.emptyTitle).toHaveText('Nothing published in this topic yet');
    await expect(topic.emptyState).toContainText(
      'Nothing has been published in Liturgy and worship yet.',
    );
    await expect(
      topic.emptyState.getByRole('link', { name: 'Browse the catalogue' }),
    ).toHaveAttribute('href', '/explore');
    await expect(topic.experts).toHaveCount(0);
    await expect(topic.pager).toHaveCount(0);
  });

  // L2-141 AC2 · empty-state AC-2
  test('items that fail to load keep the header and offer another try', async ({ page, api }) => {
    api.respond('GET', '/topics/theology-of-technology', theologyOfTechnology);
    api.fail('GET', '/topics/theology-of-technology/content', 500);
    const topic = new TopicPage(page);

    await topic.open('/topics/theology-of-technology');

    await expect(topic.heading).toHaveText('Theology of technology');
    await expect(topic.expertRows).toHaveCount(5);
    await expect(topic.emptyTitle).toHaveText("We couldn't load this topic's items");

    api.respond('GET', '/topics/theology-of-technology/content', topicContent());
    await topic.tryAgain.click();

    await expect(topic.cards).toHaveCount(24);
    await expect(topic.emptyTitle).toHaveCount(0);
  });

  // L2-005 AC2 · error-page AC-1
  test('a topic that does not exist shows the not-found page', async ({ page, api }) => {
    api.fail('GET', '/topics/no-such-topic', 404, 'not-found');
    api.fail('GET', '/topics/no-such-topic/content', 404, 'not-found');
    const topic = new TopicPage(page);

    await topic.open('/topics/no-such-topic');

    await expect(topic.heading).toHaveText("We can't find that page");
    await expect(page).toHaveTitle('Page not found - Logos Lab');
    await expect(topic.cards).toHaveCount(0);
  });

  // L2-141 AC2 · empty-state AC-2
  test('a topic that fails to load offers another try', async ({ page, api }) => {
    api.fail('GET', '/topics/theology-of-technology', 500);
    api.respond('GET', '/topics/theology-of-technology/content', topicContent());
    const topic = new TopicPage(page);

    await topic.open('/topics/theology-of-technology');

    await expect(topic.heading).toHaveText('Topic');
    await expect(topic.emptyTitle).toHaveText("We couldn't load this topic");

    api.respond('GET', '/topics/theology-of-technology', theologyOfTechnology);
    await topic.tryAgain.click();

    await expect(topic.heading).toHaveText('Theology of technology');
    await expect(topic.cards).toHaveCount(24);
  });
});
