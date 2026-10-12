import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, ErrorPage, Search } from '@logos-lab/components';
import { SearchNavigation } from '../../search-navigation';

@Component({
  selector: 'll-not-found-page',
  imports: [RouterLink, ErrorPage, Search, Button],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  protected readonly searchNavigation = inject(SearchNavigation);
}
