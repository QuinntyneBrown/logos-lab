import { people } from './people';

type Kind = 'video' | 'article' | 'module' | 'text' | 'discussion';

/** The syllabus of docs/mocks/pages/course-overview/default: six sections, 24 lessons, 340 minutes. */
const syllabus: ReadonlyArray<
  readonly [string, ReadonlyArray<readonly [string, Kind, number | null]>]
> = [
  [
    'Beginnings',
    [
      ['Why this course', 'video', 6],
      ['How to study with others', 'text', 8],
      ['A first look at Genesis 1', 'video', 18],
      ['What we mean by “AI”', 'article', 12],
    ],
  ],
  [
    'Made, not manufactured',
    [
      ['Creatures, not products', 'text', 11],
      ['Dust and breath', 'video', 15],
      ['The maker and the made', 'article', 12],
      ['What tools are for', 'text', 10],
      ['Practice: Prompting with Wisdom', 'module', 15],
    ],
  ],
  [
    'Image and likeness',
    [
      ['Tselem and demuth: the words in Genesis', 'text', 12],
      ['Representing, not resembling', 'text', 14],
      ['The image restored in Christ', 'video', 18],
      ['Practice: Bias in the Training Data', 'module', 20],
      ['Discussion: what would a machine image be?', 'discussion', null],
    ],
  ],
  [
    'Minds and machines',
    [
      ['What a model does', 'video', 15],
      ['Understanding and its imitations', 'article', 16],
      ['Case Study: The Chatbot Chaplain', 'module', 25],
      ['Can a machine pray?', 'video', 24],
    ],
  ],
  [
    'Vocation and dominion',
    [
      ['Tending the garden', 'text', 13],
      ['Dominion as service', 'video', 14],
      ['Work, rest and the seventh day', 'article', 16],
    ],
  ],
  [
    'Hope and limits',
    [
      ['What we may hope for', 'text', 16],
      ['The limits of making', 'article', 20],
      ['Hope without illusions', 'text', 10],
    ],
  ],
];

const sections = syllabus.map(([name, lessons], s) => ({
  id: `s${s + 1}`,
  title: `${s + 1}. ${name}`,
  lessons: lessons.map(([title, kind, minutes], l) => ({
    id: `l${s + 1}-${l + 1}`,
    title: `${s + 1}.${l + 1} ${title}`,
    kind,
    minutes,
  })),
}));

/** GET /api/v1/courses/imago-dei-in-an-age-of-machines: docs/mocks/pages/course-overview/default. */
export const imagoDeiCourse = {
  id: 'c-imago-dei',
  slug: 'imago-dei-in-an-age-of-machines',
  title: 'Imago Dei in an Age of Machines',
  summary:
    'What does it mean to bear the image of God when machines can speak, reason and create? Dr. Abena Mensah reads Genesis alongside today’s AI and shows why the image is a calling we receive, not a set of abilities a machine could copy.',
  coverUrl: null,
  contributors: [people.abena],
  level: 'intermediate',
  totalMinutes: 340,
  outcomes: [
    'Explain what Genesis means by “image” and “likeness”, and why the words matter',
    'Tell the difference between representing God and resembling human abilities',
    'Weigh claims that AI systems are persons, using a theology of the human person',
    'Describe human work and dominion as service, not mastery',
    'Name honest hopes and real limits for the tools we build',
  ],
  topics: [
    { name: 'The image of God and personhood', slug: 'the-image-of-god-and-personhood' },
    { name: 'Theology of technology', slug: 'theology-of-technology' },
    { name: 'Philosophy of mind', slug: 'philosophy-of-mind' },
  ],
  navigation: 'sequential',
  sections,
  enrolledCount: 1284,
  commentCount: 41,
  saved: false,
  archivedOn: null,
};

const lessonIds = sections.flatMap((section) => section.lessons.map((lesson) => lesson.id));

/** GET /api/v1/courses/imago-dei-in-an-age-of-machines/me for a member who is not enrolled. */
export const notEnrolled = {
  status: 'not-enrolled',
  percent: 0,
  completedLessons: 0,
  totalLessons: 24,
  lessons: lessonIds.map((lessonId) => ({ lessonId, state: 'locked' })),
  nextLesson: null,
  cohort: null,
  certificateCode: null,
  completedOn: null,
};

/** The same course 42% done: ten lessons finished, 3.2 next (docs/mocks/pages/course-overview/enrolled). */
export const enrolledAt42 = {
  status: 'enrolled',
  percent: 42,
  completedLessons: 10,
  totalLessons: 24,
  lessons: lessonIds.map((lessonId, index) => ({
    lessonId,
    state: index < 10 ? 'done' : index === 10 ? 'current' : 'locked',
  })),
  nextLesson: { id: 'l3-2', title: '3.2 Representing, not resembling', minutes: 14 },
  cohort: null,
  certificateCode: null,
  completedOn: null,
};
