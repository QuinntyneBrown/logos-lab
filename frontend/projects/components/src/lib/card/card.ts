import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { CardHeadingLevel } from './card-heading-level';
import { CardVariant } from './card-variant';

let nextId = 0;

/** A bordered group of related content, usually beside the main column. */
@Component({
  selector: 'aside[llCard], section[llCard], div[llCard]',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.aside-card]': "variant() === 'aside'",
    '[class.card]': "variant() === 'plain'",
    '[class.aside-card--tight]': "variant() === 'aside' && tight()",
    '[class.card--tight]': "variant() === 'plain' && tight()",
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.aria-busy]': 'busy() || null',
  },
})
export class Card {
  readonly variant = input<CardVariant>('aside');
  /** The card's title; leave it out when the page writes a title of its own. */
  readonly heading = input<string | null>(null);
  readonly headingLevel = input<CardHeadingLevel>(2);
  /** The id of the title: given, or made up when `heading` is set. */
  readonly headingId = input<string | null>(null);
  readonly tight = input(false, { transform: booleanAttribute });
  readonly busy = input(false, { transform: booleanAttribute });

  private readonly landmark = ['ASIDE', 'SECTION'].includes(
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName,
  );
  private readonly generatedId = `ll-card-title-${nextId++}`;

  protected readonly titleId = computed(() => this.headingId() ?? this.generatedId);
  protected readonly labelledBy = computed(() =>
    this.landmark && (this.heading() || this.headingId()) ? this.titleId() : null,
  );
}
