import { LoginUser } from '../../src/models/user.model';
import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class LoginPage extends BasePage {
  protected readonly url = '/login';
  readonly mainMenu: MainMenuComponent;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
  protected readonly pageTitle = 'Login';

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(page);
    this.emailInput = page.getByRole('textbox', { name: 'Enter User Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter Password' });
    this.loginButton = page.getByRole('button', { name: 'LogIn' });
    this.loginErrorMessage = page.getByTestId('login-error');
  }

  protected logStep(message: string): void {
    if (typeof globalThis.testInfo !== 'undefined' && globalThis.testInfo) {
      globalThis.testInfo.attach('Step', { body: message });
    } else {
      // eslint-disable-next-line no-console
      console.log('[Step]', message);
    }
  }

  async goto(): Promise<void> {
    this.logStep(`Visiting URL: ${this.fullUrl} (start)`);
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
    this.logStep(`Visiting URL: ${this.fullUrl} (end)`);
  }

  async fillEmail(email: string): Promise<void> {
    this.logStep(`Filling email: ${email} (start)`);
    await this.emailInput.fill(email);
    await this.emailInput.blur(); // Ensure the input is validated
    this.logStep(`Filling email: ${email} (end)`);
  }

  async fillPassword(password: string): Promise<void> {
    this.logStep(`Filling password: [HIDDEN] (start)`);
    await this.passwordInput.fill(password);
    await this.passwordInput.blur(); // Ensure the input is validated
    this.logStep(`Filling password: [HIDDEN] (end)`);
  }

  async clickLoginButton(): Promise<void> {
    this.logStep('Clicking login button (start)');
    await this.loginButton.click();
    this.logStep('Clicking login button (end)');
  }

  async login(user: LoginUser): Promise<void> {
    this.logStep('Performing login (start)');
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.clickLoginButton();
    this.logStep('Performing login (end)');
  }

  async getTitle(): Promise<string> {
    this.logStep('Getting page title (start)');
    await this.page.waitForLoadState('load');
    const title = await this.page.title();
    this.logStep('Getting page title (end)');
    return title;
  }

  get loginError(): Locator {
    return this.loginErrorMessage;
  }

  async verifyPageTitle(): Promise<void> {
    this.logStep('Verifying page title (start)');
    await expect.soft(this.page).toHaveTitle(new RegExp(this.pageTitle, 'i'));
    this.logStep('Verifying page title (end)');
  }
}
