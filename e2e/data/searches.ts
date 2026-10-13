import { content } from './content';
import { people } from './people';

const plain = (text: string) => ({ text, highlighted: false });
const match = (text: string) => ({ text, highlighted: true });

const mindsMachines = {
  id: 'c-minds-machines',
  type: 'course',
  title: 'Minds, Machines and the Soul',
  slug: 'minds-machines-and-the-soul',
  author: people.simon,
  lessonCount: 20,
  durationMinutes: 360,
} as const;

/** GET /api/v1/search?q=personhood: the "All" view of docs/mocks/pages/search-results/default. */
export function personhoodResults(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    query: 'personhood',
    total: 14,
    counts: [
      { type: 'course', count: 2 },
      { type: 'module', count: 1 },
      { type: 'video', count: 3 },
      { type: 'article', count: 2 },
      { type: 'collection', count: 1 },
      { type: 'event', count: 1 },
      { type: 'expert', count: 2 },
    ],
    groups: [
      {
        type: 'course',
        count: 2,
        hits: [
          {
            item: content.imagoDei,
            snippet: [
              plain('…what Genesis means by the image of God, and why '),
              match('personhood'),
              plain(
                ' is a calling we receive rather than a set of abilities a machine could copy…',
              ),
            ],
          },
          {
            item: mindsMachines,
            snippet: [
              plain('…section 4 asks whether '),
              match('personhood'),
              plain(' needs a body, and what follows for systems that speak but do not live…'),
            ],
          },
        ],
      },
      {
        type: 'video',
        count: 3,
        hits: [
          {
            item: content.canAMachinePray,
            snippet: [
              plain('In the transcript at 14:02: “…prayer is an act of a person before God, and '),
              match('personhood'),
              plain(' is exactly what we are unsure of here…”'),
            ],
          },
          {
            item: content.augustineAlgorithm,
            snippet: [
              plain('…Augustine’s account of memory gives '),
              match('personhood'),
              plain(' a history that no model has…'),
            ],
          },
        ],
      },
      {
        type: 'article',
        count: 2,
        hits: [
          {
            item: content.augustineLlms,
            snippet: [
              plain('…speech without a speaker raises the question of '),
              match('personhood'),
            ],
          },
          {
            item: content.sabbath,
            snippet: [
              plain('…rest is a mark of '),
              match('personhood'),
              plain(' no productivity tool grants…'),
            ],
          },
        ],
      },
      {
        type: 'collection',
        count: 1,
        hits: [
          {
            item: content.personhoodReading,
            snippet: [
              plain('Nine readings on '),
              match('personhood'),
              plain(' from Augustine to the present.'),
            ],
          },
        ],
      },
      {
        type: 'event',
        count: 1,
        hits: [
          {
            item: content.liveQa,
            snippet: [plain('A live conversation on machine '), match('personhood'), plain('.')],
          },
        ],
      },
      {
        type: 'module',
        count: 1,
        hits: [
          {
            item: content.biasInTrainingData,
            snippet: [
              plain('…whose '),
              match('personhood'),
              plain(' counts when a dataset is built…'),
            ],
          },
        ],
      },
      {
        type: 'expert',
        count: 2,
        experts: [
          {
            slug: 'abena-mensah',
            name: 'Dr. Abena Mensah',
            photoUrl: '/media/amara-osei.jpg',
            headline: [
              plain('Theologian · theological anthropology, the image of God and '),
              match('personhood'),
            ],
            itemCount: 7,
          },
          {
            slug: 'simon-keller',
            name: 'Prof. Simon Keller',
            photoUrl: '/media/marcus-bennett.jpg',
            headline: [plain('Philosopher of mind · consciousness and '), match('personhood')],
            itemCount: 6,
          },
        ],
      },
    ],
    unavailable: [],
    popularTopics: [],
    ...overrides,
  };
}

/** GET /api/v1/search?q=personhood&type=video: the narrowed view of docs/mocks/pages/search-results/selected. */
export function personhoodVideos() {
  const all = personhoodResults();
  return {
    ...all,
    groups: [
      {
        type: 'video',
        count: 3,
        hits: [
          {
            item: content.canAMachinePray,
            snippet: [
              plain('In the transcript at 14:02: “…prayer is an act of a person before God, and '),
              match('personhood'),
              plain(' is exactly what we are unsure of here…”'),
            ],
          },
          {
            item: content.augustineAlgorithm,
            snippet: [
              plain('…Augustine’s account of memory gives '),
              match('personhood'),
              plain(' a history that no model has…'),
            ],
          },
          {
            item: content.neuralNetwork,
            snippet: [
              plain('…a neural network has no '),
              match('personhood'),
              plain(' to speak of…'),
            ],
          },
        ],
      },
    ],
  };
}
