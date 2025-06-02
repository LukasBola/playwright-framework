import { Page } from '@playwright/test';

export class ArticlesPage {
  static readonly url = '/articles.html';

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(ArticlesPage.url);
    await this.page.waitForLoadState('load');
  }

  get url(): string {
    return ArticlesPage.url;
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
