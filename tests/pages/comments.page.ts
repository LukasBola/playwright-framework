import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CommentsPage extends BasePage {
  protected readonly url = '/comments.html';

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
