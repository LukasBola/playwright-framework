import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class RegisterPage extends BasePage {
  protected readonly url = '/register.html';
  readonly mainMenu: MainMenuComponent;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly alertPopup: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(page);
    this.firstNameInput = page.getByTestId('firstname-input');
    this.lastNameInput = page.getByTestId('lastname-input');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.registerButton = page.getByTestId('register-button');
    this.alertPopup = page.getByTestId('alert-popup');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.firstNameInput.blur();
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.blur();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.emailInput.blur();
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  async clickAlertPopup(): Promise<void> {
    await this.alertPopup.click();
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickRegisterButton();
  }

  async expectRegisterButtonVisible(): Promise<void> {
    await expect(this.registerButton).toBeVisible();
  }

  async expectAlertPopupVisible(): Promise<void> {
    await expect(this.alertPopup).toBeVisible();
  }

  async getAlertPopupText(): Promise<string> {
    return (await this.alertPopup.textContent()) ?? '';
  }

  async waitForUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }

  get firstName(): Locator {
    return this.firstNameInput;
  }
  get lastName(): Locator {
    return this.lastNameInput;
  }
  get email(): Locator {
    return this.emailInput;
  }
  get password(): Locator {
    return this.passwordInput;
  }
  get registerBtn(): Locator {
    return this.registerButton;
  }
  get alert(): Locator {
    return this.alertPopup;
  }
}
