import { Page } from '@playwright/test';

export class CommentsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static readonly url = '/comments.html';

  async goto(): Promise<void> {
    await this.page.goto(CommentsPage.url);
    await this.page.waitForLoadState('load');
  }

  get url(): string {
    return CommentsPage.url;
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
