import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly cartQuantity: Locator;
    private readonly checkoutButton: Locator;
    private readonly cartIcon: Locator;
    private readonly totalPriceLabel: Locator;
    private readonly removeProductButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('#shoppingCartLink');
        this.cartQuantity = page.locator('#shoppingCartLink > span');
        this.checkoutButton = page.locator('#checkOutButton');
        this.totalPriceLabel = page.locator('td span.roboto-medium').last();
        this.removeProductButton = page.locator('#shoppingCart > table > tbody > tr > td:nth-child(6) > span > a.remove.red.ng-scope');
    }

    async verifyProductInCart(name: string, quantity: number) {
        const productRow = this.page.locator('tr', { hasText: name });
        await expect(productRow).toBeVisible();
        await expect(productRow.locator('td.quantityMobile label.ng-binding')).toHaveText(quantity.toString());
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clearCheckout() {
        let quantity = await this.cartQuantity.textContent();
        if(quantity === "0"){
            return;
        }
        await this.cartIcon.click();
        await this.removeProductButton.click();
    }

    async verifyTotalPrice(totalPrice: string) {
        await expect(this.totalPriceLabel).toHaveText(totalPrice);
    }
}