import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import * as testData from '../data/testData.json';
import { generateRegistrationData } from '../utilities/newUserDataProvider';

test.describe('User Login and Registration Flows', () => {
  
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await page.goto('/');
    await homePage.navigateToUserAccounts();
  });   

	test('Validate valid user can login sucessfully @smoke', async () => {    

    await loginPage.login( testData.validUser.username, testData.validUser.password);
    await homePage.verifyUserLoggedIn(testData.validUser.username);
		await homePage.logout();
		await homePage.verifyUserLoggedOut(testData.validUser.username);

  });

  test('Validate error handling for invalid login attempts', async () => {    

    await loginPage.login(
      testData.invalidUser.username, 
      testData.invalidUser.password
    );
    await loginPage.verifyInvalidLoginMessage(testData.invalidUser.expectedError);
    await loginPage.navigateToMainPage();
  });

  test('Validate new user registration', async ({ page }) => {
		let registrationPage = new RegisterPage(page);
		await loginPage.navigateToCreateAccount();
		await expect(page).toHaveURL(/.*register/);
    let userData = generateRegistrationData();
		await registrationPage.fillRegistrationForm(userData);
    await homePage.verifyUserLoggedIn(userData.username);
  });

	test('Validate exisiting user cannot register again', async ({ page }) => {
		let registrationPage = new RegisterPage(page);
		await loginPage.navigateToCreateAccount();
		await expect(page).toHaveURL(/.*register/);
		await registrationPage.fillRegistrationForm(testData.validUser);
		await registrationPage.verifyExistingUserMessage(testData.validUser.existingUserErrorMsg);
  });

});