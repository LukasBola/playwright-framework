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

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.emailInput.blur(); // Ensure the input is validated
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur(); // Ensure the input is validated
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async getTitle(): Promise<string> {
    await this.page.waitForLoadState('load');
    return this.page.title();
  }

  get loginError(): Locator {
    return this.loginErrorMessage;
  }

  async verifyPageTitle(): Promise<void> {
    await expect.soft(this.page).toHaveTitle(new RegExp(this.pageTitle, 'i'));
  }
}
