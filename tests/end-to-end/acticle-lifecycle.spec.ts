import { generateArticle } from '../../src/factories/article.factory';
import { ArticleCreationModel } from '../../src/models/article.model';
import { testUser1 } from '../../src/test-data/user.data';
import { ArticlePage } from '../pages/article.page';
import { ArticlesPage } from '../pages/articles.page';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';
import { AddArticleView } from '../views/add-article.view';
import test, { expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Article Tests', () => {
  let loginPage: LoginPage;
  let welcomePage: WelcomePage;
  let addArticleView: AddArticleView;
  let articlePage: ArticlePage;
  let articlesPage: ArticlesPage;
  let article: ArticleCreationModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    articlesPage = new ArticlesPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    await welcomePage.mainMenu.clickOpenArticles();
  });

  test('add article', async () => {
    // Arrange
    article = generateArticle();
    const articleCreationSuccessMessage = 'Article was created';

    // Act
    await articlesPage.clickAddArticleButton();
    await addArticleView.createArticle(article);

    // Assert
    await addArticleView.expectAlertPopupMessage(articleCreationSuccessMessage);
    await expect
      .soft(articlePage.articleTitleLocator)
      .toHaveText(article.title, { useInnerText: true });
    await expect
      .soft(articlePage.articleBodyLocator)
      .toHaveText(article.body, { useInnerText: true });
  });

  test('user can access single article', async () => {
    // Użyj artykułu utworzonego w poprzednim teście
    await articlePage.clickArticleByTitle(article.title);

    // Assert
    await expect
      .soft(articlePage.articleTitleLocator)
      .toHaveText(article.title, { useInnerText: true });
    await expect
      .soft(articlePage.articleBodyLocator)
      .toHaveText(article.body, { useInnerText: true });
  });

  test('user can delete single article', async ({ page }) => {
    // Użyj artykułu utworzonego w poprzednim teście
    await articlePage.clickArticleByTitle(article.title);
    await articlePage.deleteArticle();
    await articlePage.waitForURL();
    await expect(page.getByText(article.title)).toBeHidden();
    // Assert
  });
});
