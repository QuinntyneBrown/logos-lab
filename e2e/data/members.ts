/** GET /api/v1/me for the signed-in cast (CurrentMember). */
export const members = {
  miriam: {
    id: 'u-miriam',
    displayName: 'Miriam Clarke',
    email: 'miriam.clarke@example.ca',
    avatarUrl: '/media/hannah-kowalski.jpg',
    roles: ['learner'],
    capabilities: ['Learn'],
    themePreference: 'system',
  },
  isaac: {
    id: 'u-isaac',
    displayName: 'Isaac Moreau',
    email: 'isaac.moreau@logoslab.ca',
    avatarUrl: '/media/elijah-brooks.jpg',
    roles: ['learner', 'editor', 'admin'],
    capabilities: [
      'Learn',
      'AuthorOwnContent',
      'LeadOwnCohorts',
      'ManageAnyContent',
      'CurateAsLogosLab',
      'Moderate',
      'Administer',
      'ViewPlatformAnalytics',
    ],
    themePreference: 'system',
  },
} as const;
