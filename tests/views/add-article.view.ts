import { Locator, Page, expect } from '@playwright/test';

export class AddArticleView {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly bodyInput: Locator;
  readonly saveButton: Locator;
  readonly alertPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByTestId('title-input');
    this.bodyInput = page.getByTestId('body-text');
    this.saveButton = page.getByTestId('save');
    this.alertPopup = page.getByTestId('alert-popup');
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async fillBody(body: string): Promise<void> {
    await this.bodyInput.fill(body);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  async clickAlertPopup(): Promise<void> {
    await this.alertPopup.click();
  }

  async expectAlertPopupMessage(expectedMessage: string): Promise<void> {
    await expect(this.alertPopup).toHaveText(expectedMessage);
  }
}
