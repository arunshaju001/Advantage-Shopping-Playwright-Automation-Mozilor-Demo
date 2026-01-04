import { Page, Locator, expect } from '@playwright/test';
import { Category } from '../data/types';

export class HomePage {
    private readonly page: Page;
    private readonly searchIcon: Locator;
    private readonly searchInput: Locator;
    private readonly userIcon: Locator;
    private readonly usernameHolder: Locator;
    private readonly cartIcon: Locator;
    private readonly loginPopup: Locator;
    private readonly speakersCategory: Locator;
    private readonly tabletsCategory: Locator;
    private readonly laptopsCategory: Locator;
    private readonly miceCategory: Locator;
    private readonly headphonesCategory: Locator;
    private readonly logoutButton: Locator;
    private readonly homeIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeIcon = page.locator('body > header > nav > div > a');
        this.searchIcon = page.locator('#menuSearch');
        this.searchInput = page.locator('input[name="mobile_search"]');
        this.userIcon = page.locator('a#menuUserLink');
        this.usernameHolder = page.locator('#menuUserLink > span');
        this.loginPopup = page.locator('.PopUp');
        this.cartIcon = page.locator('a#shoppingCartLink');
        this.speakersCategory = page.locator('#speakersImg');
        this.tabletsCategory = page.locator('#tabletsImg');
        this.laptopsCategory = page.locator('#laptopsImg');
        this.miceCategory = page.locator('#miceImg');
        this.headphonesCategory = page.locator('#headphonesImg');
        this.logoutButton = page.locator('#loginMiniTitle > label:nth-child(3)');
    }

    /**
     * Searches for a product using the search bar
     * @param productName Name of the product (e.g., 'HP ELITEPAD 1000 G2')
     */
    async searchForProduct(productName: string) {
        await this.searchIcon.click();
        await this.searchInput.fill(productName);
        await this.page.keyboard.press('Enter');
    }

    /**
     * Navigates to a category by clicking the "Shop Now" section
     * @param category Name of category to click
     */
    async selectCategory(category: Category) {
        switch (category) {
            case Category.Speakers: await this.speakersCategory.click(); break;
            case Category.Tablets: await this.tabletsCategory.click(); break;
            case Category.Laptops: await this.laptopsCategory.click(); break;
            case Category.Mice: await this.miceCategory.click(); break;
            case Category.Headphones: await this.headphonesCategory.click(); break;
        }
    }

    async navigateToUserAccounts() {
        await this.userIcon.click();
        await expect(this.loginPopup).toBeVisible();
    }

    async navigateToCheckout() {
        await this.cartIcon.click();
    }

    async navigateToHomePage() {
        await this.homeIcon.click();
    }

    async logout() {
        await this.userIcon.click();
        await this.logoutButton.click();
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