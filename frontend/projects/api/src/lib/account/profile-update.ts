/** PUT /api/v1/me/profile: the editable parts of the member's profile. */
export interface ProfileUpdate {
  readonly displayName: string;
  readonly bio: string;
  readonly pronouns: string;
  readonly profileVisible: boolean;
}
