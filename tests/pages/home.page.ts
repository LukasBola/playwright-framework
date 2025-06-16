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
    this.logStep(`Visiting URL: ${this.fullUrl} (start)`);
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
    this.logStep(`Visiting URL: ${this.fullUrl} (end)`);
  }

  async getTitle(): Promise<string> {
    this.logStep('Getting page title (start)');
    const title = await this.page.title();
    this.logStep('Getting page title (end)');
    return title;
  }
}
