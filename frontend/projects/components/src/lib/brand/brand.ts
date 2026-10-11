import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandVariant } from './brand-variant';

/** The Logos Lab mark and wordmark, linking home. */
@Component({
  selector: 'll-brand',
  imports: [RouterLink],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Brand {
  readonly variant = input<BrandVariant>('full');
  readonly label = input.required<string>();
  readonly href = input('/');
}
