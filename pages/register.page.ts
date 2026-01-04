import { Page, Locator, expect } from '@playwright/test';
import { UserData } from '../data/types';

export class RegisterPage {
    private readonly page: Page;

    // Account Details
    private readonly usernameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;

    // Personal Details
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly phoneInput: Locator;

    // Address
    private readonly countrySelect: Locator;
    private readonly cityInput: Locator;
    private readonly addressInput: Locator;
    private readonly stateInput: Locator;
    private readonly postalCodeInput: Locator;

    // Options
    private readonly agreeCheckbox: Locator;
    private readonly registerButton: Locator;

    //Error Validation
    private readonly errorMsg: Locator;

    constructor(page: Page) {
        this.page = page;

        // Account
        this.usernameInput = page.locator('input[name="usernameRegisterPage"]');
        this.emailInput = page.locator('input[name="emailRegisterPage"]');
        this.passwordInput = page.locator('input[name="passwordRegisterPage"]');
        this.confirmPasswordInput = page.locator('input[name="confirm_passwordRegisterPage"]');

        // Personal
        this.firstNameInput = page.locator('input[name="first_nameRegisterPage"]');
        this.lastNameInput = page.locator('input[name="last_nameRegisterPage"]');
        this.phoneInput = page.locator('input[name="phone_numberRegisterPage"]');

        // Address
        this.countrySelect = page.locator('select[name="countryListboxRegisterPage"]');
        this.cityInput = page.locator('input[name="cityRegisterPage"]');
        this.addressInput = page.locator('input[name="addressRegisterPage"]');
        this.stateInput = page.locator('input[name="state_/_province_/_regionRegisterPage"]');
        this.postalCodeInput = page.locator('input[name="postal_codeRegisterPage"]');

        // Agreements & Submit
        this.agreeCheckbox = page.locator('input[name="i_agree"]');
        this.registerButton = page.locator('#register_btn'); 

        //Existing User
        this.errorMsg = page.locator('label.center.block.smollMargin.invalid');
    }

    async fillRegistrationForm(userData: UserData) {
        // Account Details
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.fill(userData.username);
        await this.emailInput.fill(userData.email);
        await this.passwordInput.fill(userData.password);
        await this.confirmPasswordInput.fill(userData.password);

        // Personal Details
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.phoneInput.fill(userData.phoneNumber);

        // Address
        await this.countrySelect.selectOption({ label: userData.country});
        await this.cityInput.fill(userData.city);
        await this.addressInput.fill(userData.address);
        await this.stateInput.fill(userData.state);
        await this.postalCodeInput.fill(userData.postalCode);        
    }

    async registerNewUser(){
        await this.agreeCheckbox.check();
        await this.registerButton.click();
    }

    async verifyExistingUserMessage(errorMsg: string) {
        this.registerNewUser();
        await expect(this.errorMsg).toBeVisible();
        await expect(this.errorMsg).toHaveText(errorMsg);
    }
}