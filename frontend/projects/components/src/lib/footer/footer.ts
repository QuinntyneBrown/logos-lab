import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Brand } from '../brand/brand';

/** The end of every page: policy links, help and one sentence about Logos Lab. */
@Component({
  selector: 'll-footer',
  imports: [Brand],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly variant = input<'full' | 'quiet'>('full');
  readonly navLabel = input.required<string>();
  readonly homeLabel = input('');
}
