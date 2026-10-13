/** One selected filter option, as the active-filters row shows it. */
export interface ExplorePill {
  /** "Type: Course". */
  readonly label: string;
  /** "Course": the option alone, for sentences that name the filters. */
  readonly value: string;
  /** "Remove filter Type: Course". */
  readonly removeLabel: string;
  readonly remove: () => void;
}
