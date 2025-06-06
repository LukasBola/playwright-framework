import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  protected static readonly url = '/articles.html';

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(ArticlesPage.url);
    await this.page.waitForLoadState('load');
  }

  get url(): string {
    return (this.constructor as typeof ArticlesPage).url;
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
