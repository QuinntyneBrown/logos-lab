import { catalogueItems } from '../data/catalogue';
import { theologyOfTechnology, topicContent } from '../data/topics';
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
});
