import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class WelcomePage extends BasePage {
  readonly welcomeMessageLocator: Locator;
  readonly mainMenu: MainMenuComponent;
  protected readonly url = '/welcome';
  protected readonly pageTitle = '🦎 GAD | Welcome';

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(page);
    this.welcomeMessageLocator = page.getByTestId('hello');
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

  async expectWelcomeMessage(email: string): Promise<void> {
    this.logStep(`Checking welcome message for: ${email} (start)`);
    await expect.soft(this.welcomeMessageLocator).toHaveText(`Hi ${email}!`);
    this.logStep(`Checking welcome message for: ${email} (end)`);
  }

  async verifyPageTitle(): Promise<void> {
    const actualTitle = await this.page.title();
    this.logStep(
      `Verifying page title (start). Actual: '${actualTitle}', Expected: '${this.pageTitle}'`,
    );
    await expect.soft(this.page).toHaveTitle(new RegExp(this.pageTitle, 'i'));
    this.logStep(
      `Verifying page title (end). Actual: '${actualTitle}', Expected: '${this.pageTitle}'`,
    );
  }
}
