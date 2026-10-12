import { ContentType } from '@logos-lab/api';

const SEGMENTS: Record<ContentType, string> = {
  course: 'courses',
  module: 'modules',
  video: 'videos',
  article: 'articles',
  collection: 'collections',
  event: 'events',
};

/** The public URL of an item (L2-146 AC3). */
export function contentPath(type: ContentType, slug: string): string {
  return `/${SEGMENTS[type]}/${slug}`;
}
