/** A filter that is on, as the pill that names it and takes it off. */
export interface EventsPill {
  readonly label: string;
  readonly removeLabel: string;
  readonly remove: () => void;
}
