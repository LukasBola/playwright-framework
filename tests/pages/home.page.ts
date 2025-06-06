import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  protected static readonly url = '/';

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(HomePage.url);
    await this.page.waitForLoadState('load');
  }

  get url(): string {
    return HomePage.url;
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
