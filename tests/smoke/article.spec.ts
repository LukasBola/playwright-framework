import { generateArticle } from '../../src/factories/article.factory';
import { ArticleCreationModel } from '../../src/models/article.model';
import { LoginUser } from '../../src/models/user.model';
import { testUser1 } from '../../src/test-data/user.data';
import { ArticlePage } from '../pages/article.page';
import { ArticlesPage } from '../pages/articles.page';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';
import { AddArticleView } from '../views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Article Tests', () => {
  let loginPage: LoginPage;
  let welcomePage: WelcomePage;
  let addArticleView: AddArticleView;
  let articlePage: ArticlePage;
  let articlesPage: ArticlesPage;
  let user: LoginUser;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    articlesPage = new ArticlesPage(page);
    user = {
      email: testUser1.email,
      password: testUser1.password,
    };
    await loginPage.goto();
    await loginPage.login(user);
    await welcomePage.mainMenu.clickOpenArticles();
  });

  test('add article @GAD-R04-01', async () => {
    // Arrange
    const article: ArticleCreationModel = generateArticle();
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

  test('do not create article with empty title @GAD-R04-01', async () => {
    // Arrange
    const article: ArticleCreationModel = generateArticle();
    article.title = '';
    const articleCreationErrorMessage = 'Article was not created';

    // Act
    await articlesPage.clickAddArticleButton();
    await addArticleView.createArticle(article);

    // Assert
    await addArticleView.expectAlertPopupMessage(articleCreationErrorMessage);
  });

  test('do not create article with empty body @GAD-R04-01', async () => {
    // Arrange
    const article: ArticleCreationModel = generateArticle();
    article.body = '';
    const articleCreationErrorMessage = 'Article was not created';

    // Act
    await articlesPage.clickAddArticleButton();
    await addArticleView.createArticle(article);

    // Assert
    await addArticleView.expectAlertPopupMessage(articleCreationErrorMessage);
  });

  test('add article with title exceeding 128 signs @GAD-R04-02', async () => {
    // Arrange
    const titleLength = 129;
    const article: ArticleCreationModel = generateArticle(titleLength);
    const articleCreationErrorMessage = 'Article was not created';

    // Act
    await articlesPage.clickAddArticleButton();
    await addArticleView.createArticle(article);

    // Assert
    await addArticleView.expectAlertPopupMessage(articleCreationErrorMessage);
  });

  test('add article with title NOT exceeding 128 signs @GAD-R04-02', async () => {
    // Arrange
    const titleLength = 128;
    const article: ArticleCreationModel = generateArticle(titleLength);
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
});
