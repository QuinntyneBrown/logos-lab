import { content } from './content';
import { people } from './people';

const base = [
  content.imagoDei,
  content.canAMachinePray,
  content.augustineLlms,
  content.aiInThePulpit,
  content.augustineAlgorithm,
  content.fiveQuestions,
  content.biasInTrainingData,
  content.liveQa,
  content.faithWork,
  content.sabbath,
  content.neuralNetwork,
  content.personhoodReading,
];

/** A second dozen, so a page holds the 24 items the catalogue shows. */
const more = Array.from({ length: 12 }, (_, i) => ({
  id: `a-more-${i + 1}`,
  type: 'article',
  title: `Notes on Faith and Technology, Part ${i + 1}`,
  slug: `notes-on-faith-and-technology-part-${i + 1}`,
  author: people.thomas,
  readingMinutes: 5 + i,
}));

export const catalogueItems = [...base, ...more];

const experts = [
  { value: 'abena-mensah', label: 'Dr. Abena Mensah' },
  { value: 'thomas-hale', label: 'Rev. Dr. Thomas Hale' },
  { value: 'joel-santos', label: 'Dr. Joel Santos' },
  { value: 'lucia-ortega', label: 'Dr. Lucía Ortega' },
  { value: 'simon-keller', label: 'Prof. Simon Keller' },
  ...Array.from({ length: 33 }, (_, i) => ({
    value: `guest-expert-${i + 6}`,
    label: `Dr. Guest Expert ${i + 6}`,
  })),
];

export const facets = {
  types: [
    { value: 'course', count: 24 },
    { value: 'module', count: 11 },
    { value: 'video', count: 86 },
    { value: 'article', count: 64 },
    { value: 'collection', count: 18 },
    { value: 'event', count: 9 },
  ],
  topics: [
    { value: 'theology-of-technology', label: 'Theology of technology', count: 41 },
    { value: 'ai-ethics', label: 'AI ethics', count: 37 },
    { value: 'church-and-ministry', label: 'Church and ministry', count: 33 },
    {
      value: 'the-image-of-god-and-personhood',
      label: 'The image of God and personhood',
      count: 28,
    },
    { value: 'formation-and-education', label: 'Formation and education', count: 22 },
    { value: 'work-and-vocation', label: 'Work and vocation', count: 19 },
    { value: 'creativity-and-the-arts', label: 'Creativity and the arts', count: 17 },
    { value: 'justice-and-society', label: 'Justice and society', count: 15 },
    { value: 'scripture-and-interpretation', label: 'Scripture and interpretation', count: 14 },
    { value: 'philosophy-of-mind', label: 'Philosophy of mind', count: 12 },
    { value: 'prayer-and-attention', label: 'Prayer and attention', count: 9 },
    { value: 'community-and-belonging', label: 'Community and belonging', count: 6 },
  ],
  contributors: [{ value: 'logos-lab', label: 'Logos Lab' }, ...experts],
};

/** GET /api/v1/catalogue for /explore: the first page of docs/mocks/pages/explore/default. */
export function cataloguePage(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    items: catalogueItems,
    total: 212,
    page: 1,
    pageCount: 9,
    facets,
    searchDegraded: false,
    ...overrides,
  };
}

/** The 24 courses of the catalogue, newest first. */
export const catalogueCourses = [
  content.imagoDei,
  content.faithWork,
  ...Array.from({ length: 22 }, (_, i) => ({
    id: `c-more-${i + 1}`,
    type: 'course',
    title: `Faith and Technology, Unit ${i + 1}`,
    slug: `faith-and-technology-unit-${i + 1}`,
    author: people.abena,
    lessonCount: 8 + i,
    durationMinutes: 120 + i * 5,
  })),
];

/** GET /api/v1/catalogue?type=course: docs/mocks/pages/explore/selected. */
export function coursesPage() {
  return cataloguePage({ items: catalogueCourses, total: 24, pageCount: 1 });
}
