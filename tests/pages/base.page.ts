import { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly url: string;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
