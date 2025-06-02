import { HomePage } from '../pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Playwright Example Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('home page title', async () => {
    await homePage.goto();
    const title = await homePage.getTitle();
    expect(title).toMatch(/GAD/);
  });

  test('articles page title', async ({ page }) => {
    await page.goto('/articles.html');
    await page.waitForLoadState('load');
    await expect(page).toHaveTitle(/Articles/);
  });
});
