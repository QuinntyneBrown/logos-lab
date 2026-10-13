/** A notice above the event's head: cancelled, or a moved time. */
export interface EventNoticeView {
  readonly tone: 'danger' | 'warning';
  readonly heading: string;
  readonly body: string;
  readonly link: { readonly label: string; readonly path: string } | null;
}
