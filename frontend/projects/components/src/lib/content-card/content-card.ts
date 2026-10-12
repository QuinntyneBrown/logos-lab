import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Badge } from '../badge/badge';
import { IconButton } from '../button/icon-button';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';
import { ProgressBar } from '../progress-bar/progress-bar';
import { ContentCardAuthor } from './content-card-author';
import { ContentCardProgress } from './content-card-progress';
import { ContentCardStatus } from './content-card-status';
import { ContentCardType } from './content-card-type';

const TILES: Record<ContentCardType, string> = {
  course: 'tile--sage',
  module: 'tile--sage',
  video: 'tile--fjord',
  article: 'tile--clay',
  collection: 'tile--oat',
  event: 'tile--oat',
};

const GLYPHS: Record<ContentCardType, IconName> = {
  course: 'course',
  module: 'module',
  video: 'video',
  article: 'article',
  collection: 'collection',
  event: 'calendar',
};

/** One published item in a grid or a list. */
@Component({
  selector: 'll-content-card',
  imports: [NgTemplateOutlet, RouterLink, Badge, IconButton, Icon, ProgressBar],
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCard {
  readonly type = input.required<ContentCardType>();
  readonly typeLabel = input.required<string>();
  readonly title = input.required<string>();
  readonly path = input.required<string>();
  readonly headingLevel = input<2 | 3 | 4>(3);
  readonly author = input<ContentCardAuthor | null>(null);
  readonly meta = input<readonly string[]>([]);
  readonly duration = input<string | null>(null);
  readonly coverUrl = input<string | null>(null);
  readonly variant = input<'card' | 'row'>('card');
  readonly progress = input<ContentCardProgress | null>(null);
  readonly statuses = input<readonly ContentCardStatus[]>([]);
  readonly saved = input<boolean | null>(null);
  readonly saveLabel = input('');
  readonly unavailable = input(false, { transform: booleanAttribute });

  readonly saveToggled = output<boolean>();

  protected readonly tile = computed(() => (this.unavailable() ? '' : TILES[this.type()]));
  protected readonly glyph = computed(() => GLYPHS[this.type()]);
}
