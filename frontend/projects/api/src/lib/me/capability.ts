/** What a member's roles allow (L2-016; detailed design authorization/enforce-role-permissions). */
export type Capability =
  | 'Learn'
  | 'AuthorOwnContent'
  | 'LeadOwnCohorts'
  | 'ManageAnyContent'
  | 'CurateAsLogosLab'
  | 'Moderate'
  | 'Administer'
  | 'ViewPlatformAnalytics';
