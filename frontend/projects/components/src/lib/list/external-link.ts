import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** A link to another site: it opens in a new tab and says so to assistive technology. */
@Component({
  selector: 'a[llExternalLink]',
  templateUrl: './external-link.html',
  styleUrl: './external-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.href]': 'safeHref()',
    '[attr.target]': "safeHref() ? '_blank' : null",
    '[attr.rel]': "safeHref() ? 'noopener noreferrer' : null",
  },
})
export class ExternalLink {
  /** An absolute `https://` address; anything else leaves the text without a link. */
  readonly href = input.required<string>();
  /** The visually hidden phrase, translated: "(external site, opens in a new tab)". */
  readonly externalLabel = input.required<string>();

  protected readonly safeHref = computed(() =>
    this.href().startsWith('https://') ? this.href() : null,
  );
}
