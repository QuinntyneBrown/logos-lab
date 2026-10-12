import { ContentSummary } from '@logos-lab/api';
import { ContentCardAuthor, ContentCardType } from '@logos-lab/components';
import { contentFacts, videoDuration } from './content-facts';
import { contentTypeLabel } from './content-labels';
import { contentPath } from './content-paths';

/** The inputs of a content card for one item. */
export interface ContentCardView {
  readonly id: string;
  readonly type: ContentCardType;
  readonly typeLabel: string;
  readonly title: string;
  readonly path: string;
  readonly author: ContentCardAuthor;
  readonly meta: readonly string[];
  readonly duration: string | null;
  readonly coverUrl: string | null;
}

export function toContentCard(item: ContentSummary, locale: string): ContentCardView {
  return {
    id: item.id,
    type: item.type,
    typeLabel: contentTypeLabel(item.type),
    title: item.title,
    path: contentPath(item.type, item.slug),
    author: {
      name: item.author.name,
      photoUrl: item.author.photoUrl,
      logosLab: item.author.isLogosLab ?? false,
    },
    meta: contentFacts(item, locale),
    duration: item.durationSeconds === undefined ? null : videoDuration(item.durationSeconds),
    coverUrl: item.coverUrl ?? null,
  };
}
