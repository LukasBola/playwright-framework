import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  protected readonly url = '/articles.html';
  readonly mainMenu: MainMenuComponent;
  readonly addArticleButton: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(page);
    this.addArticleButton = page.getByRole('button', { name: 'Add Article' });
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

  async clickAddArticleButton(): Promise<void> {
    this.logStep('Clicking Add Article button (start)');
    await this.addArticleButton.click();
    this.logStep('Clicking Add Article button (end)');
  }
}
