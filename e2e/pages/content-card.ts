import type { Locator } from '@playwright/test';

/** One content card; located inside a section by its position or title. */
export class ContentCard {
  readonly type: Locator;
  readonly titleLink: Locator;
  readonly byline: Locator;
  readonly meta: Locator;
  readonly duration: Locator;
  readonly cover: Locator;
  readonly logosLabMark: Locator;

  constructor(readonly root: Locator) {
    this.type = root.locator('.content-card__type');
    this.titleLink = root.locator('.content-card__title a');
    this.byline = root.locator('.content-card__by');
    this.meta = root.locator('.content-card__meta > span');
    this.duration = root.locator('.content-card__duration');
    this.cover = root.locator('.content-card__cover');
    this.logosLabMark = root.locator('.content-card__mark');
  }

  async facts(): Promise<string[]> {
    return this.meta.allInnerTexts();
  }

  async coverTone(): Promise<string | undefined> {
    const classes = (await this.cover.getAttribute('class')) ?? '';
    return classes.split(' ').find((c) => c.startsWith('tile--'));
  }
}
