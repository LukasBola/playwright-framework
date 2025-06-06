import { ArticlesPage } from '../pages/articles.page';
import { CommentsPage } from '../pages/comments.page';
import { HomePage } from '../pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Gad tests', () => {
  test('comments button navigates to comments page @GAD_R01_03', async ({
    page,
  }) => {
    // Arrange
    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.clickOpenComments();

    // Assert
    // articlesPage.mainMenu.expectOpenCommentsDisabled();
    const title = await commentsPage.getTitle();
    expect(title).toContain('Comments');
  });

  test('article button navigates to article page @GAD_R01_03', async ({
    page,
  }) => {
    // Arrange
    const commentsPage = new CommentsPage(page);
    const articlesPage = new ArticlesPage(page);

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.clickOpenArticles();

    // Assert
    // articlesPage.mainMenu.expectOpenCommentsDisabled();
    const title = await articlesPage.getTitle();
    expect(title).toContain('Articles');
  });

  test('homepage button navigates to main page @GAD_R01_03', async ({
    page,
  }) => {
    // Arrange
    const articlesPage = new ArticlesPage(page);
    const homePage = new HomePage(page);

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.clickGadLink();

    // Assert
    expect(await homePage.getTitle()).toContain('GAD');
  });
});
