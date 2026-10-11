import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonShape } from './skeleton-shape';

/** A placeholder shape for loading content; hidden from assistive technology. */
@Component({
  selector: 'span[llSkeleton]',
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'skeleton',
    'aria-hidden': 'true',
    '[class.skeleton--title]': "shape() === 'title'",
    '[class.skeleton--text]': "shape() === 'text' || shape() === 'text-short'",
    '[class.is-short]': "shape() === 'text-short'",
    '[class.skeleton--photo]': "shape() === 'photo'",
    '[class.skeleton--circle]': "shape() === 'circle'",
    '[class.skeleton--block]': "shape() === 'block'",
    '[class.skeleton--pill]': "shape() === 'pill'",
  },
})
export class Skeleton {
  readonly shape = input<SkeletonShape>('text');
}
