import { Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CategoryPage } from '../pages/category.page';
import { ProductDetailsPage } from '../pages/product.details.page';
import { CartPage } from '../pages/cart.page';
import { Category } from '../data/types';
import { LoginPage } from '../pages/login.page';
import { OrderPaymentPage } from '../pages/order.page';
import { OrderConfirmationPage } from '../pages/order.confirmation.page';

export class ProductWorkflow {

    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    private readonly categoryPage: CategoryPage;
    private readonly productDetailsPage: ProductDetailsPage;
    private readonly cartPage: CartPage;
    private readonly orderpage: OrderPaymentPage;
    private readonly confirmationpage: OrderConfirmationPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.categoryPage = new CategoryPage(page);
        this.productDetailsPage = new ProductDetailsPage(page);
        this.cartPage = new CartPage(page);
        this.orderpage = new OrderPaymentPage(page);
        this.confirmationpage = new OrderConfirmationPage(page);
    }

    async addProductToCartAndVerify(data: any) {
        const category = data.category as Category;
        await this.cartPage.clearCheckout();
        await this.homePage.navigateToHomePage();
        await this.homePage.selectCategory(category);
        await this.categoryPage.verifyCategoryTitle(category);
        await this.categoryPage.selectProductByName(data.productName);
        await this.productDetailsPage.setQuantity(data.quantity);
        await this.productDetailsPage.addProductToCart();
        await this.homePage.navigateToCheckout();
        await this.cartPage.verifyProductInCart(data.productName, data.quantity);
        await this.cartPage.verifyTotalPrice(data.totalPrice);
        await this.cartPage.clickCheckout();
    }

    async completePaymentAndVerify(data: any) {
        await this.orderpage.proceedToPayment();
        await this.orderpage.completeSafePayOrder(data.username, data.password);
        await this.confirmationpage.verifyThankYouMessage(data.thankYouMsg);
        console.log(`orderNumber: ${await this.confirmationpage.getOrderNumber()}`);
        console.log(`trackingNumber: ${await this.confirmationpage.getTrackingNumber()}`);
        await this.confirmationpage.verifyTotal(data.shippingPrice);
        await this.homePage.logout();
    }

    async navigateAndLogin(data: any){
        await this.homePage.navigateToUserAccounts();
        await this.loginPage.login( data.username, data.password);
    }

    async orderPageLogin(data: any){
        await this.orderpage.orderPageLogin(data.username, data.password);
    }
}