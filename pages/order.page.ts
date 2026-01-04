import { Page, Locator, expect } from '@playwright/test';

export class OrderPaymentPage {
    private readonly page: Page;
    private readonly nextButton: Locator;
    private readonly payNowSafePayButton: Locator;
    private readonly safePayUsernameInput: Locator;
    private readonly safePayPasswordInput: Locator;
    private readonly checkoutUserNameTextbox: Locator;
    private readonly checkoutPasswordTextbox: Locator;
    private readonly checkoutLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nextButton = page.locator('.mobileBtnHandler #next_btn');
        this.payNowSafePayButton = page.locator('#pay_now_btn_SAFEPAY');
        this.safePayUsernameInput = page.locator('input[name="safepay_username"]');
        this.safePayPasswordInput = page.locator('input[name="safepay_password"]');
        this.checkoutUserNameTextbox = page.locator('input[name="usernameInOrderPayment"]');
        this.checkoutPasswordTextbox = page.locator('input[name="passwordInOrderPayment"]');
        this.checkoutLoginButton = page.locator('#login_btn');
    }

    async proceedToPayment() {
        await this.nextButton.click();
        await expect(this.page.locator('#paymentMethod')).toBeVisible();
    }

    async completeSafePayOrder(username: string, password: string) {
        await this.safePayUsernameInput.fill(username);
        await this.safePayPasswordInput.fill(password);
        await expect(this.payNowSafePayButton).toBeEnabled();
        await this.payNowSafePayButton.click();
    }

    async verifyShippingUser(fullName: string) {
        const userLabel = this.page.locator('#userDetails label').first();
        await expect(userLabel).toHaveText(fullName);
    }

    async orderPageLogin(username: string, password: string) {
        await this.checkoutUserNameTextbox.waitFor({ state: 'visible' });
        await this.checkoutUserNameTextbox.fill(username);
        await this.checkoutPasswordTextbox.fill(password);
        await this.checkoutLoginButton.click();
    }
}