import { people } from './people';

const names = [
  { slug: 'lucia-ortega', name: 'Dr. Lucía Ortega', photo: people.lucia.photoUrl },
  { slug: 'thomas-hale', name: 'Rev. Dr. Thomas Hale', photo: people.thomas.photoUrl },
  { slug: 'simon-keller', name: 'Prof. Simon Keller', photo: people.simon.photoUrl },
  { slug: 'abena-mensah', name: 'Dr. Abena Mensah', photo: people.abena.photoUrl },
  { slug: 'joel-santos', name: 'Dr. Joel Santos', photo: people.joel.photoUrl },
];

const titles = [
  ['Church historian', 'Augustine, attention and memory', 8],
  ['Christian ethicist', 'technology and moral formation', 11],
  ['Philosopher of mind', 'can machines understand?', 6],
  ['Theologian', 'theological anthropology and the image of God', 7],
  ['Machine-learning researcher', 'how models work', 9],
] as const;

/** The first expert listings of the directory, as GET /api/v1/experts returns them. */
export const expertListings = names.map((n, i) => ({
  slug: n.slug,
  name: n.name,
  photoUrl: n.photo,
  title: titles[i][0],
  focus: titles[i][1],
  itemCount: titles[i][2],
}));

/** 24 listings: the five of the cast, then guests. */
export const expertPage = [
  ...expertListings,
  ...Array.from({ length: 19 }, (_, i) => ({
    slug: `guest-expert-${i + 6}`,
    name: `Dr. Guest Expert ${i + 6}`,
    photoUrl: null,
    title: 'Theologian',
    focus: 'faith and technology',
    itemCount: 1 + (i % 4),
  })),
];

export const topicOptions = [
  { slug: 'theology-of-technology', name: 'Theology of technology' },
  { slug: 'the-image-of-god-and-personhood', name: 'The image of God and personhood' },
  { slug: 'ai-ethics', name: 'AI ethics' },
  { slug: 'work-and-vocation', name: 'Work and vocation' },
  { slug: 'church-and-ministry', name: 'Church and ministry' },
  { slug: 'scripture-and-interpretation', name: 'Scripture and interpretation' },
  { slug: 'philosophy-of-mind', name: 'Philosophy of mind' },
  { slug: 'formation-and-education', name: 'Formation and education' },
  { slug: 'justice-and-society', name: 'Justice and society' },
  { slug: 'creativity-and-the-arts', name: 'Creativity and the arts' },
  { slug: 'data-and-privacy', name: 'Data and privacy' },
  { slug: 'pastoral-care', name: 'Pastoral care' },
];

/** GET /api/v1/experts: the first page of docs/mocks/pages/experts/default. */
export function expertDirectory(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    experts: expertPage,
    total: 38,
    totalExperts: 38,
    page: 1,
    pageCount: 2,
    topics: topicOptions,
    ...overrides,
  };
}

/** GET /api/v1/experts when nothing matches the search and topic: docs/mocks/pages/experts/no-results. */
export function noExperts() {
  return expertDirectory({ experts: [], total: 0, pageCount: 0 });
}
