import { AddArticleModel } from '../../src/models/article.model';
import { LoginUser } from '../../src/models/user.model';
import { testUser1 } from '../../src/test-data/user.data';
import { ArticlePage } from '../pages/article.page';
import { ArticlesPage } from '../pages/articles.page';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';
import { AddArticleView } from '../views/add-article.view';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Article Tests', () => {
  test('add article @GAD-R04-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    const addArticleView = new AddArticleView(page);
    const articlePage = new ArticlePage(page);
    const articlesPage = new ArticlesPage(page);
    const user: LoginUser = {
      email: testUser1.email,
      password: testUser1.password,
    };
    const article: AddArticleModel = {
      title: faker.lorem.sentence(3),
      body: faker.lorem.paragraph(10),
    };
    const articleCreationSuccessMessage = 'Article was created';

    // Act
    await loginPage.goto();
    await loginPage.login(user);

    await welcomePage.mainMenu.clickOpenArticles();

    await articlesPage.clickAddArticleButton();

    await addArticleView.createArticle(article);

    // Assert
    await addArticleView.expectAlertPopupMessage(articleCreationSuccessMessage);
    await expect
      .soft(articlePage.articleTitleLocator)
      .toHaveText(article.title);
    await expect.soft(articlePage.articleBodyLocator).toHaveText(article.body);
  });
});
