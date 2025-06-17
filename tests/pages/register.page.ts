import { RegisterUser } from '../../src/models/user.model';
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

  async fillFirstName(firstName: string): Promise<void> {
    this.logStep('Filling first name (start)');
    await this.firstNameInput.fill(firstName);
    await this.firstNameInput.blur();
    this.logStep('Filling first name (end)');
  }

  async fillLastName(lastName: string): Promise<void> {
    this.logStep('Filling last name (start)');
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.blur();
    this.logStep('Filling last name (end)');
  }

  async fillEmail(email: string): Promise<void> {
    this.logStep('Filling email (start)');
    await this.emailInput.fill(email);
    await this.emailInput.blur();
    this.logStep('Filling email (end)');
  }

  async fillPassword(password: string): Promise<void> {
    this.logStep('Filling password (start)');
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
    this.logStep('Filling password (end)');
  }

  async clickRegisterButton(): Promise<void> {
    this.logStep('Clicking register button (start)');
    await this.registerButton.click();
    this.logStep('Clicking register button (end)');
  }

  async clickAlertPopup(): Promise<void> {
    this.logStep('Clicking alert popup (start)');
    await this.alertPopup.click();
    this.logStep('Clicking alert popup (end)');
  }

  async register(user: RegisterUser): Promise<void> {
    this.logStep(
      `Registering user (start): firstName='${user.firstName}', lastName='${user.lastName}', email='${user.email}', password='${user.password}'`,
    );
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.clickRegisterButton();
    this.logStep(
      `Registering user (end): firstName='${user.firstName}', lastName='${user.lastName}', email='${user.email}', password='${user.password}'`,
    );
  }

  async expectRegisterButtonVisible(): Promise<void> {
    this.logStep('Expecting register button to be visible (start)');
    await expect(this.registerButton).toBeVisible();
    this.logStep('Expecting register button to be visible (end)');
  }

  async expectAlertPopupVisible(): Promise<void> {
    this.logStep('Expecting alert popup to be visible (start)');
    await expect(this.alertPopup).toBeVisible();
    this.logStep('Expecting alert popup to be visible (end)');
  }

  async expectAlertPopupMessage(expectedMessage: string): Promise<void> {
    this.logStep('Expecting alert popup message (start)');
    await this.expectAlertPopupVisible();
    await expect.soft(this.alertPopup).toHaveText(expectedMessage);
    this.logStep('Expecting alert popup message (end)');
  }

  async getAlertPopupText(): Promise<string> {
    this.logStep('Getting alert popup text (start)');
    const text = (await this.alertPopup.textContent()) ?? '';
    this.logStep('Getting alert popup text (end)');
    return text;
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
  get alertPopupMessage(): Locator {
    return this.alertPopup;
  }
}
