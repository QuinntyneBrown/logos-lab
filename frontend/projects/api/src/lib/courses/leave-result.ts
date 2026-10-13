/** What leaving a course answers with. */
export interface LeaveResult {
  /** The day the kept progress expires, as `YYYY-MM-DD`. */
  readonly keepUntil: string;
  /** The lesson enrolling again would carry on from, such as "1.2". */
  readonly resumeAt: string | null;
}
