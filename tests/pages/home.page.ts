import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly exampleElement: Locator;

  private static readonly url = '/';

  constructor(page: Page) {
    this.page = page;
    this.exampleElement = page.locator('selector');
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
