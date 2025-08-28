import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class ArticlePage extends BasePage {
  protected readonly url = '/article.html';
  readonly mainMenu: MainMenuComponent;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(page);
    this.articleTitle = page.getByTestId('article-title');
    this.articleBody = page.getByTestId('article-body');
    this.deleteButton = page.getByTestId('delete');
  }

  get articleTitleLocator(): Locator {
    return this.articleTitle;
  }

  get articleBodyLocator(): Locator {
    return this.articleBody;
  }

  async clickArticleTitle(): Promise<void> {
    this.logStep('Clicking article title (start)');
    await this.articleTitle.click();
    this.logStep('Clicking article title (end)');
  }

  async clickArticleBody(): Promise<void> {
    this.logStep('Clicking article body (start)');
    await this.articleBody.click();
    this.logStep('Clicking article body (end)');
  }

  async clickArticleByTitle(title: string): Promise<void> {
    this.logStep(`Clicking article with title: '${title}' (start)`);
    await this.page.getByText(title).click();
    this.logStep(`Clicking article with title: '${title}' (end)`);
  }

  async expectArticleCreatedAlert(expectedMessage: string): Promise<void> {
    await expect(this.page.getByTestId('alert-popup')).toHaveText(
      expectedMessage,
    );
  }

  async deleteArticle(): Promise<void> {
    this.logStep('Deleting article (start)');
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteButton.click();
    this.logStep('Deleting article (end)');
  }
}
