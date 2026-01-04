import { Page, Locator, expect } from '@playwright/test';

export class CategoryPage {
    private readonly page: Page;
    private readonly categoryTitle: Locator;
    private readonly productItems: Locator;
    private readonly filterButton: Locator;
    private readonly priceAccordion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categoryTitle = page.locator('.categoryTitle');
        this.productItems = page.locator('li[ng-repeat*="product in []"]');
        this.filterButton = page.locator('.filterCount span');
        this.priceAccordion = page.locator('#accordionPrice');
    }

    /**
     * Selects a product by its name from the list
     * @param productName Exact name of the product to click
     */
    async selectProductByName(productName: string) {
        const product = this.productItems.filter({ hasText: productName });
        await product.scrollIntoViewIfNeeded();
        await expect(product).toBeVisible();
        await product.click();
    }

    async verifyCategoryTitle(expectedTitle: string) {
        await expect(this.categoryTitle).toContainText(expectedTitle, { ignoreCase: true });
    }

}