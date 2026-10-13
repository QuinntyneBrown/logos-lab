/** One checkbox option of a filter group, as the panel shows it. */
export interface ExploreOption {
  readonly value: string;
  readonly label: string;
  /** The items behind the option; null where the API sends none. */
  readonly count: number | null;
  readonly checked: boolean;
}
