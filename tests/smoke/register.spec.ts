import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { WelcomePage } from '../pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Register Tests', () => {
  test('register with correct details @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    const firstName = 'Jak';
    const lastName = 'Nowaczyk';
    const email = `jann87${new Date().getTime()}@git.com`;
    const password = 'tests1';
    // Act
    await registerPage.goto();
    await registerPage.register(firstName, lastName, email, password);
    // Assert
    await registerPage.expectAlertPopupMessage('User created');
    await loginPage.verifyPageTitle(); // Alternative way to check title
    await loginPage.waitForURL(); // Alternative way to wait for URL
    await loginPage.login(email, password);
    await welcomePage.expectWelcomeMessage(email);
    expect(await welcomePage.getTitle()).toContain('Welcome');
  });
});
