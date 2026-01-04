import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly userAccountLink: Locator;
    private readonly popup: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;
    private readonly createNewAccountLink: Locator;
    private readonly signInResultMessage: Locator;
    private readonly closeLoginPopup: Locator;
    private readonly usernameHolder: Locator;
    private readonly logoutButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.userAccountLink = page.locator('a#menuUserLink');
        this.popup = page.locator('.PopUp');
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.signInButton = page.locator('#sign_in_btn');
        this.createNewAccountLink = page.locator('.create-new-account');
        this.signInResultMessage = page.locator('#signInResultMessage');
        this.closeLoginPopup = page.locator('div.closeBtn.loginPopUpCloseBtn');
        this.usernameHolder = page.locator('#menuUserLink > span');
        this.logoutButton = page.locator('#loginMiniTitle > label:nth-child(3)');
    }

    async login(username: string, password: string) {
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async navigateToCreateAccount() {
        await this.createNewAccountLink.click();
    }

    async navigateToUserAccounts() {
        await this.userAccountLink.click();
        await expect(this.popup).toBeVisible();
    }

    async navigateToMainPage() {
        await this.closeLoginPopup.click();
    }

    async logout() {
        await this.userAccountLink.click();
        await this.logoutButton.click();
    }

    async verifyInvalidLoginMessage(errorMsg: string) {
        await expect(this.signInResultMessage).toBeVisible();
        await expect(this.signInResultMessage).toHaveText(errorMsg);
    }

    async verifyUserLoggedIn(username: string) {
        await expect(this.usernameHolder).toBeVisible();
        await expect(this.usernameHolder).toHaveText(username);
    }

    async verifyUserLoggedOut(username: string) {
        await expect(this.usernameHolder).toBeVisible();
        await expect(this.usernameHolder).not.toHaveText(username);
        await expect(this.usernameHolder).toHaveText('');
    }
}