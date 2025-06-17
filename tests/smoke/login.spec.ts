import { LoginUser } from '../../src/models/user.model';
import { testUser1 } from '../../src/test-data/user.data';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Login Tests', () => {
  test('login with correct credentials', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    const user: LoginUser = {
      email: testUser1.email,
      password: testUser1.password,
    };

    // Act
    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    // Assert
    await welcomePage.expectWelcomeMessage(user.email);
    expect(await welcomePage.getTitle()).toContain('Welcome');
  });

  test('login with incorrect password', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const userEmail = testUser1.email;
    const userPassword = 'incorrectPassword';

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    // Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');

    expect.soft(await loginPage.getTitle()).toContain('Login');
    await expect.soft(loginPage.page).toHaveTitle(/Login/); // Alternative way to check title
  });
});
