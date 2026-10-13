/** The places meter of a registration panel. */
export interface RsvpPlaces {
  /** The places taken, including the member when they are registered. */
  readonly taken: number;
  readonly capacity: number;
  /** The progress bar's accessible name: "Places taken". */
  readonly label: string;
  /** The count in words, translated and formatted by the page: "311 registered · 189 places left". */
  readonly text: string;
}
