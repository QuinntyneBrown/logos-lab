import { ContentType } from '@logos-lab/api';

/** The visible type line of a content card. */
export function contentTypeLabel(type: ContentType): string {
  switch (type) {
    case 'course':
      return $localize`:@@content.type.course:Course`;
    case 'module':
      return $localize`:@@content.type.module:Module`;
    case 'video':
      return $localize`:@@content.type.video:Video`;
    case 'article':
      return $localize`:@@content.type.article:Article`;
    case 'collection':
      return $localize`:@@content.type.collection:Collection`;
    case 'event':
      return $localize`:@@content.type.event:Event`;
  }
}
