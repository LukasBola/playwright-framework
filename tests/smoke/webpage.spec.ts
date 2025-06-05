import { ArticlesPage } from '../pages/articles.page';
import { CommentsPage } from '../pages/comments.page';
import { HomePage } from '../pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Playwright Example Tests', () => {
  let homePage: HomePage;
  let articlesPage: ArticlesPage;
  let commentsPage: CommentsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    articlesPage = new ArticlesPage(page);
    commentsPage = new CommentsPage(page);
    // Arrange przeniesiony do beforeEach
  });

  test('home page title @GAD-R01-01 @fast @slow', async () => {
    // Act
    await homePage.goto();
    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain('GAD');
  });

  // @smoke
  test('articles page title @GAD-R01-01', async () => {
    // Act
    await articlesPage.goto();
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain('Articles');
  });

  test('comments page title @GAD-R01-02', async () => {
    // Act
    await commentsPage.goto();
    const title = await commentsPage.getTitle();

    // Assert
    expect(title).toContain('Comments');
  });
});
