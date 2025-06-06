import { Locator, Page, expect } from '@playwright/test';

export class MainMenuComponent {
  readonly gadLinkHomePage: Locator;
  readonly openComments: Locator;
  readonly openFlashPosts: Locator;
  readonly openGames: Locator;
  readonly openArticles: Locator;
  readonly btnDropdown: Locator;
  readonly backOfficeToolsLink: Locator;
  readonly jakTestowacLink: Locator;

  constructor(page: Page) {
    this.gadLinkHomePage = page.locator(
      "//h1[contains(@class, 'nav-menu')]//a[contains(text(), 'GAD')]",
    );
    this.openComments = page.getByTestId('open-comments');
    this.openFlashPosts = page.getByTestId('open-flashPosts');
    this.openGames = page.getByTestId('open-games');
    this.openArticles = page.getByTestId('open-articles');
    this.btnDropdown = page.getByTestId('btn-dropdown');
    this.backOfficeToolsLink = page.getByRole('link', {
      name: 'Visit BackOffice Tools',
    });
    this.jakTestowacLink = page.getByRole('link', {
      name: 'Visit jakTestowac.pl',
    });
  }

  async clickGadLinkHomePage(): Promise<void> {
    await this.gadLinkHomePage.click();
  }

  async clickOpenComments(): Promise<void> {
    await this.openComments.click();
  }

  async clickOpenFlashPosts(): Promise<void> {
    await this.openFlashPosts.click();
  }

  async clickOpenGames(): Promise<void> {
    await this.openGames.click();
  }

  async clickOpenArticles(): Promise<void> {
    await this.openArticles.click();
  }

  async clickDropdown(): Promise<void> {
    await this.btnDropdown.click();
  }

  async clickBackOfficeTools(): Promise<void> {
    await this.backOfficeToolsLink.click();
  }

  async clickJakTestowac(): Promise<void> {
    await this.jakTestowacLink.click();
  }

  async expectGadLinkVisible(): Promise<void> {
    await expect(this.gadLinkHomePage).toBeVisible();
  }

  async expectDropdownVisible(): Promise<void> {
    await expect(this.btnDropdown).toBeVisible();
  }

  async expectBackOfficeToolsVisible(): Promise<void> {
    await expect(this.backOfficeToolsLink).toBeVisible();
  }

  async expectJakTestowacVisible(): Promise<void> {
    await expect(this.jakTestowacLink).toBeVisible();
  }

  async expectOpenCommentsVisible(): Promise<void> {
    await expect(this.openComments).toBeVisible();
  }

  async expectOpenCommentsDisabled(): Promise<void> {
    await expect(this.openComments).toBeDisabled();
  }
}
