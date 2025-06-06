import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CommentsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private static readonly url = '/comments.html';

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
