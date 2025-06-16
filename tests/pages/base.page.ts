import { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly url: string;

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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

  get fullUrl(): string {
    const base = process.env.BASE_URL || '';
    return `${base}${this.url}`;
  }

  async waitForURL(): Promise<void> {
    this.logStep('Waiting for expected URL (start)');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForURL(new RegExp(this.fullUrl, 'i'));
    this.logStep('Waiting for expected URL (end)');
  }

  protected logStep(message: string): void {
    if (typeof globalThis.testInfo !== 'undefined' && globalThis.testInfo) {
      globalThis.testInfo.attach('Step', { body: message });
    } else {
      // eslint-disable-next-line no-console
      console.log('[Step]', message);
    }
  }
}
