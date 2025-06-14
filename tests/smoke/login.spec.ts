import { testUser1 } from '../../src/test-data/user.data';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Login Tests', () => {
  test('login flow', async ({ page }) => {
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
});
