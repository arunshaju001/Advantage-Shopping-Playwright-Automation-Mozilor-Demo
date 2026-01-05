import { test } from '@playwright/test';
import * as testData from '../data/testData.json';
import { Category } from '../data/types';
import { ProductWorkflow } from '../workflows/product.workflow';

test.describe('Product checkout Flows', () => {
  
    let productWorkflow: ProductWorkflow;
    let data: any;

    test.beforeEach(async ({ page }) => {
        productWorkflow = new ProductWorkflow(page);
        await page.goto('/');
    });   

    test('Validate logged in user can place order sucessfully @smoke', async ({ page }) => {    
        data = testData.loggedInCheckout;
        
        await test.step('Navigate and Login as user', async () => {
            await productWorkflow.navigateAndLogin(data);
        });
        await test.step('Select Product and Add to Cart', async () => {
            await productWorkflow.addProductToCartAndVerify(data);
        });
        await test.step('Finalize Payment and Verify Order', async () => {
            await productWorkflow.completePaymentAndVerify(data);
        });
    });  

    test('Validate guest can checkout and login to place order sucessfully', async ({ page }) => {    
        data = testData.guestCheckout;
        await test.step('Select Product and Add to Cart', async () => {
            await productWorkflow.addProductToCartAndVerify(data);
        });
        await test.step('Login during Checkout', async () => {
            await productWorkflow.orderPageLogin(data);
        });
        await test.step('Finalize Payment and Verify Order', async () => {
            await productWorkflow.completePaymentAndVerify(data);
        });
    });  

    test.afterEach(async ({ page }) => {
        await productWorkflow.clearCartAfterTest(data);
    }); 

});