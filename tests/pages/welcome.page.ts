import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class WelcomePage extends BasePage {
  readonly welcomeMessageLocator: Locator;
  protected readonly url = '/welcome';

  constructor(page: Page) {
    super(page);
    this.welcomeMessageLocator = page.getByTestId('hello');
  }

  async expectWelcomeMessage(email: string): Promise<void> {
    await expect(this.welcomeMessageLocator).toHaveText(`Hi ${email}!`);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
