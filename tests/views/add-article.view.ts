import { ArticleCreationModel } from '../../src/models/article.model';
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

  private logStep(message: string): void {
    // eslint-disable-next-line no-console
    console.log('[AddArticleView]', message);
  }

  async fillTitle(title: string): Promise<void> {
    this.logStep(`Filling title: '${title}' (start)`);
    await this.titleInput.fill(title);
    this.logStep(`Filling title: '${title}' (end)`);
  }

  async fillBody(body: string): Promise<void> {
    this.logStep(`Filling body: '${body}' (start)`);
    await this.bodyInput.fill(body);
    this.logStep(`Filling body: '${body}' (end)`);
  }

  async clickSave(): Promise<void> {
    this.logStep('Clicking save button (start)');
    await this.saveButton.click();
    this.logStep('Clicking save button (end)');
  }

  async clickAlertPopup(): Promise<void> {
    this.logStep('Clicking alert popup (start)');
    await this.alertPopup.click();
    this.logStep('Clicking alert popup (end)');
  }

  async expectAlertPopupMessage(expectedMessage: string): Promise<void> {
    this.logStep(`Expecting alert popup message: '${expectedMessage}' (start)`);
    await expect(this.alertPopup).toHaveText(expectedMessage);
    this.logStep(`Expecting alert popup message: '${expectedMessage}' (end)`);
  }

  async createArticle(article: ArticleCreationModel): Promise<void> {
    this.logStep(`Creating article with title  (start)`);
    await this.fillTitle(article.title);
    await this.fillBody(article.body);
    await this.clickSave();
    this.logStep(`Creating article with title (end)`);
  }
}
