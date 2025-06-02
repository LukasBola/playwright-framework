import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly exampleElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.exampleElement = page.locator('selector');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('load');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
