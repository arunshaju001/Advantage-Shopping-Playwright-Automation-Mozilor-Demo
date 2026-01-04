import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;
    private readonly createNewAccountLink: Locator;
    private readonly signInResultMessage: Locator;
    private readonly closeLoginPopup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.signInButton = page.locator('#sign_in_btn');
        this.createNewAccountLink = page.locator('.create-new-account');
        this.signInResultMessage = page.locator('#signInResultMessage');
        this.closeLoginPopup = page.locator('div.closeBtn.loginPopUpCloseBtn');        
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

    async navigateToMainPage() {
        await this.closeLoginPopup.click();
    }

    async verifyInvalidLoginMessage(errorMsg: string) {
        await expect(this.signInResultMessage).toBeVisible();
        await expect(this.signInResultMessage).toHaveText(errorMsg);
    }
}