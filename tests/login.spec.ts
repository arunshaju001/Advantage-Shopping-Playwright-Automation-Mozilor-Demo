import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/products.page';
import { RegisterPage } from '../pages/register.page';
import * as testData from '../data/testData.json';
import { generateRegistrationData } from '../utilities/newUserDataProvider';

test.describe('User Login and Registration Flows', () => {
  
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.navigateToUserAccounts();
  });   

	test('Validate valid user can login sucessfully', async () => {    

    await loginPage.login( testData.validUser.username, testData.validUser.password);
    await loginPage.verifyUserLoggedIn(testData.validUser.username);
		await loginPage.logout();
		await loginPage.verifyUserLoggedOut(testData.validUser.username);

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
		await registrationPage.fillRegistrationForm(generateRegistrationData());
		await registrationPage.registerNewUser();
  });

	test('Validate exisiting user cannot register again', async ({ page }) => {
		let registrationPage = new RegisterPage(page);
		await loginPage.navigateToCreateAccount();
		await expect(page).toHaveURL(/.*register/);
		await registrationPage.fillRegistrationForm(testData.validUser);
		await registrationPage.verifyExistingUserMessage(testData.validUser.existingUserErrorMsg);
  });

});