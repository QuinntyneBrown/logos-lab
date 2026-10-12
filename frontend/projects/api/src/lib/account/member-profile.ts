/** GET /api/v1/me/profile: how other members see the signed-in member. */
export interface MemberProfile {
  readonly displayName: string;
  readonly bio: string;
  readonly pronouns: string;
  readonly avatarUrl: string | null;
  readonly profileVisible: boolean;
}
