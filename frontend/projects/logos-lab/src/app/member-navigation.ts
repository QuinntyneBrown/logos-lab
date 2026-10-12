import { CurrentMember } from '@logos-lab/api';
import { MenuItem, SidebarNavItem } from '@logos-lab/components';

/** The member's own places, in the account menu and the drawer's "You" group. */
export function memberPlaces(): readonly MenuItem[] {
  return [
    {
      id: 'dashboard',
      label: $localize`:@@member.dashboard:Dashboard`,
      path: '/dashboard',
      icon: 'monitor',
    },
    {
      id: 'my-learning',
      label: $localize`:@@member.myLearning:My learning`,
      path: '/my-learning',
      icon: 'course',
    },
    { id: 'saved', label: $localize`:@@member.saved:Saved`, path: '/saved', icon: 'bookmark' },
    {
      id: 'messages',
      label: $localize`:@@member.messages:Messages`,
      path: '/messages',
      icon: 'message',
    },
    {
      id: 'settings',
      label: $localize`:@@member.settings:Settings`,
      path: '/settings/profile',
      icon: 'sliders',
    },
  ];
}

/** The staff places the member's capabilities allow (L2-016: never link to what they cannot use). */
export function staffPlaces(member: CurrentMember): readonly MenuItem[] {
  const can = (capability: string) => member.capabilities.some((c) => c === capability);
  return [
    ...(can('AuthorOwnContent') || can('ManageAnyContent')
      ? [
          {
            id: 'studio',
            label: $localize`:@@staff.studio:Studio`,
            path: '/studio',
            icon: 'edit' as const,
          },
        ]
      : []),
    ...(can('ManageAnyContent')
      ? [
          {
            id: 'review',
            label: $localize`:@@staff.review:Review queue`,
            path: '/studio/review',
            icon: 'document' as const,
          },
        ]
      : []),
    ...(can('Moderate')
      ? [
          {
            id: 'moderation',
            label: $localize`:@@staff.moderation:Moderation`,
            path: '/moderation',
            icon: 'flag' as const,
          },
        ]
      : []),
    ...(can('Administer')
      ? [
          {
            id: 'admin',
            label: $localize`:@@staff.admin:Admin`,
            path: '/admin',
            icon: 'shield' as const,
          },
        ]
      : []),
  ];
}

/** Menu items as drawer rows (the drawer shows no icons). */
export function toSidebarItems(items: readonly MenuItem[]): readonly SidebarNavItem[] {
  return items.map(({ id, label, path }) => ({ id, label, path }));
}

export const SIGN_OUT_ID = 'sign-out';

export function signOutItem(): MenuItem {
  return { id: SIGN_OUT_ID, label: $localize`:@@member.signOut:Sign out`, icon: 'sign-out' };
}
