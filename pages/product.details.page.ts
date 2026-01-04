import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
    private readonly page: Page;
    private readonly productName: Locator;
    private readonly productPrice: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('#Description h1');
        this.productPrice = page.locator('#Description h2');
        this.quantityInput = page.locator('input[name="quantity"]');
        this.addToCartButton = page.locator('button[name="save_to_cart"]');
    }

    async setQuantity(count: number) {
        await this.quantityInput.fill(count.toString());
    }

    async addProductToCart() {
        await expect(this.addToCartButton).toBeEnabled();
        await this.addToCartButton.click();
    }

}