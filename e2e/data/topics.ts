import { catalogueItems } from './catalogue';

/** GET /api/v1/topics/theology-of-technology: docs/mocks/pages/topic/default. */
export const theologyOfTechnology = {
  slug: 'theology-of-technology',
  name: 'Theology of technology',
  description:
    'How Christian thought understands tools, making and the machines that shape us, from the garden in Genesis to the newest language models.',
  itemCount: 41,
  byLogosLab: true,
  experts: [
    {
      slug: 'lucia-ortega',
      name: 'Dr. Lucía Ortega',
      photoUrl: '/media/ruth-alvarez.jpg',
      headline: 'Church historian',
      itemCount: 4,
    },
    {
      slug: 'abena-mensah',
      name: 'Dr. Abena Mensah',
      photoUrl: '/media/amara-osei.jpg',
      headline: 'Theologian',
      itemCount: 3,
    },
    {
      slug: 'thomas-hale',
      name: 'Rev. Dr. Thomas Hale',
      photoUrl: '/media/peter-walsh.jpg',
      headline: 'Christian ethicist',
      itemCount: 3,
    },
    {
      slug: 'joel-santos',
      name: 'Dr. Joel Santos',
      photoUrl: '/media/daniel-reyes.jpg',
      headline: 'Machine-learning researcher',
      itemCount: 2,
    },
    {
      slug: 'simon-keller',
      name: 'Prof. Simon Keller',
      photoUrl: '/media/marcus-bennett.jpg',
      headline: 'Philosopher of mind',
      itemCount: 2,
    },
  ],
};

/** GET /api/v1/topics/theology-of-technology/content: the first of two pages. */
export function topicContent(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    items: catalogueItems.slice(0, 24),
    total: 41,
    page: 1,
    pageCount: 2,
    ...overrides,
  };
}

/** A topic nothing is published in yet: docs/mocks/pages/topic/empty. */
export const liturgyAndWorship = {
  slug: 'liturgy-and-worship',
  name: 'Liturgy and worship',
  description:
    'Prayer, song and the shape of gathered worship when screens, streams and software are part of the room.',
  itemCount: 0,
  byLogosLab: false,
  experts: [],
};
