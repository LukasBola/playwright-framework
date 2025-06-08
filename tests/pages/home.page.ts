import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  readonly exampleElement;
  protected readonly url = '/';

  constructor(page: Page) {
    super(page);
    this.exampleElement = page.locator('selector');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
