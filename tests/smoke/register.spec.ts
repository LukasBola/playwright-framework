import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { WelcomePage } from '../pages/welcome.page';
import { faker } from '@faker-js/faker';
import { test } from '@playwright/test';

test.describe('Register Tests', () => {
  test('register with correct details @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19);
    const firstName = faker.person.firstName().replace(/[^\p{L}]/gu, '');
    const lastName = faker.person.lastName().replace(/[^\p{L}]/gu, '');
    const email = faker.internet.email({
      firstName,
      lastName: `${lastName}.${formattedDate}`,
    });
    const password = faker.internet.password({ length: 8, memorable: true });
    // Act
    await registerPage.goto();
    await registerPage.register(firstName, lastName, email, password);
    // Assert
    await registerPage.expectAlertPopupMessage('User created');
    await loginPage.verifyPageTitle(); // Alternative way to check title
    await loginPage.waitForURL(); // Alternative way to wait for URL
    await loginPage.login(email, password);
    await welcomePage.expectWelcomeMessage(email);
    await welcomePage.verifyPageTitle();
  });
});
