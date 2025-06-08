import { testUser1 } from '../../src/test-data/user.data';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Login Tests', () => {
  test('login with correct credentials', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    const userEmail = testUser1.email;
    const userPassword = testUser1.password;

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    // Assert
    await welcomePage.expectWelcomeMessage(userEmail);
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
  });
});
