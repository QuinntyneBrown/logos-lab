import { SidebarNavGroup } from '@logos-lab/components';

/** The Settings section navigation (detailed design accounts/edit-member-profile). */
export const SETTINGS_NAVIGATION: readonly SidebarNavGroup[] = [
  {
    label: $localize`:@@settings.nav.group:Settings`,
    items: [
      {
        id: 'profile',
        label: $localize`:@@settings.nav.profile:Profile`,
        path: '/settings/profile',
      },
      {
        id: 'account',
        label: $localize`:@@settings.nav.account:Email and password`,
        path: '/settings/account',
      },
      {
        id: 'security',
        label: $localize`:@@settings.nav.security:Security`,
        path: '/settings/security',
      },
      {
        id: 'sessions',
        label: $localize`:@@settings.nav.sessions:Sessions`,
        path: '/settings/sessions',
      },
      {
        id: 'notifications',
        label: $localize`:@@settings.nav.notifications:Notifications`,
        path: '/settings/notifications',
      },
      {
        id: 'privacy',
        label: $localize`:@@settings.nav.privacy:Privacy and messaging`,
        path: '/settings/privacy',
      },
      { id: 'data', label: $localize`:@@settings.nav.data:Your data`, path: '/settings/data' },
      {
        id: 'blocked',
        label: $localize`:@@settings.nav.blocked:Blocked members`,
        path: '/settings/blocked',
      },
    ],
  },
];
