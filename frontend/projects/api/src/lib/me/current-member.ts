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
  /** False until the member opens the link in their verification email (L2-007). */
  readonly emailVerified: boolean;
  /** When the cleanup job deletes a still-unverified account, as an ISO 8601 instant; else null. */
  readonly deleteUnverifiedAt: string | null;
}
