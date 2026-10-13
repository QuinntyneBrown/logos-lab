/** The lesson "Continue" opens. */
export interface NextLesson {
  readonly id: string;
  /** "3.2 Representing, not resembling". */
  readonly title: string;
  readonly minutes: number | null;
}
