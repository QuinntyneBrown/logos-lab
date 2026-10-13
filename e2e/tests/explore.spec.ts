import { cataloguePage } from '../data/catalogue';
import { expect, test } from '../fixtures/test';
import { ExplorePage } from '../pages/explore.page';

test.describe('Explore', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-002 AC1 · page-header AC-1, search-filter-toolbar AC-1, content-card AC-1
  test('opens on the newest items, each as a card', async ({ page, api }) => {
    api.respond('GET', '/catalogue', cataloguePage());
    const explore = new ExplorePage(page);

    await explore.open();

    await expect(explore.eyebrow).toHaveText('The catalogue');
    await expect(explore.heading).toHaveText('Explore');
    await expect(explore.sub).toHaveText(
      'Every published course, module, video, article, collection and event, from 38 experts and the Logos Lab editors.',
    );
    await expect(page).toHaveTitle('Explore - Logos Lab');
    await expect(explore.count).toHaveText('Showing 1–24 of 212 items, newest first');
    await expect(explore.cards).toHaveCount(24);
    const first = explore.card(0);
    await expect(first.type).toHaveText('Course');
    await expect(first.titleLink).toHaveText('Imago Dei in an Age of Machines');
    await expect(first.titleLink).toHaveAttribute(
      'href',
      '/courses/imago-dei-in-an-age-of-machines',
    );
    await expect(first.byline).toHaveText('Dr. Abena Mensah');
    await expect(explore.card(1).duration).toHaveText('24:18');
  });
});
