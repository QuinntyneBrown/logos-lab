/** GET /api/v1/me/profile for the signed-in cast (MemberProfile). */
export const profiles = {
  miriam: {
    displayName: 'Miriam Clarke',
    bio: "Communications lead at a church in Halifax. I'm learning how to talk about AI with care, from the pulpit notes to the parish newsletter.",
    pronouns: '',
    avatarUrl: '/media/hannah-kowalski.jpg',
    profileVisible: true,
  },
} as const;
