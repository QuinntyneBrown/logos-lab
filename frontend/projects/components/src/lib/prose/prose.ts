import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProseVariant } from './prose-variant';

/**
 * Rich text the server already sanitized, or markup the page writes itself. The string goes through
 * Angular's own sanitizer as a second line of defence and is never trusted as it is.
 */
@Component({
  selector: 'll-prose',
  templateUrl: './prose.html',
  styleUrl: './prose.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Prose {
  /** Sanitized HTML; when null the projected content is shown instead. */
  readonly html = input<string | null>(null);
  readonly variant = input<ProseVariant>('default');
}
