import { ThemePreference } from '../preferences/theme-preference';
import { Capability } from './capability';
import { Role } from './role';

/** GET /api/v1/me: the signed-in member. */
export interface CurrentMember {
  readonly id: string;
  readonly displayName: string;
  readonly email: string;
  readonly avatarUrl: string | null;
  readonly roles: readonly Role[];
  readonly capabilities: readonly Capability[];
  readonly themePreference: ThemePreference;
}
