import { RegisterUser } from '../../src/models/user.model';
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
    const user: RegisterUser = {
      firstName: faker.person.firstName().replace(/[^\p{L}]/gu, ''),
      lastName: faker.person.lastName().replace(/[^\p{L}]/gu, ''),
      email: '', // tymczasowo pusty, uzupełnimy poniżej
      password: faker.internet.password({ length: 8, memorable: true }),
    };
    const formattedDate = new Date().toISOString().slice(0, 19);
    user.email = faker.internet.email({
      firstName: user.firstName,
      lastName: `${user.lastName}.${formattedDate}`,
    });
    // Act
    await registerPage.goto();
    await registerPage.register(user);
    // Assert
    await registerPage.expectAlertPopupMessage('User created');
    await loginPage.verifyPageTitle(); // Alternative way to check title
    await loginPage.waitForURL(); // Alternative way to wait for URL
    await loginPage.login(user);
    await welcomePage.expectWelcomeMessage(user.email);
    await welcomePage.verifyPageTitle();
  });

  test('not register with incorrect email format @GAD-R03-04', async ({
    page,
  }) => {
    // Arrange
    const registerPage = new RegisterPage(page);
    const user: RegisterUser = {
      firstName: faker.person.firstName().replace(/[^\p{L}]/gu, ''),
      lastName: faker.person.lastName().replace(/[^\p{L}]/gu, ''),
      email: 'invalid-email-format', // Invalid email format
      password: faker.internet.password({ length: 8, memorable: true }),
    };
    const expectedEmailErrorMessage: string =
      'Please provide a valid email address';

    // Act
    await registerPage.goto();
    await registerPage.register(user);
    // Assert
    await registerPage.expectEmailErrorMessage(expectedEmailErrorMessage);
  });

  test('not register with  email not provided @GAD-R03-04', async ({
    page,
  }) => {
    // Arrange
    const registerPage = new RegisterPage(page);
    const user: RegisterUser = {
      firstName: faker.person.firstName().replace(/[^\p{L}]/gu, ''),
      lastName: faker.person.lastName().replace(/[^\p{L}]/gu, ''),
      email: 'invalid-email-format', // Invalid email format
      password: faker.internet.password({ length: 8, memorable: true }),
    };
    const expectedEmailErrorMessage: string = 'This field is required';

    // Act
    await registerPage.goto();
    await registerPage.fillFirstName(user.firstName);
    await registerPage.fillLastName(user.lastName);
    await registerPage.fillPassword(user.password);
    await registerPage.clickRegisterButton();
    // Assert
    await registerPage.expectEmailErrorMessage(expectedEmailErrorMessage);
  });
});
