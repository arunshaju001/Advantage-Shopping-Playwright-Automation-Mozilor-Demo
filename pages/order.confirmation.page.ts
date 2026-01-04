import { Page, Locator, expect } from '@playwright/test';

export class OrderConfirmationPage {
  private readonly page: Page;
  private readonly confirmationContainer: Locator;
  private readonly thankYouMessage: Locator;
  private readonly trackingNumber: Locator;
  private readonly orderNumber: Locator;
  private readonly totalAmount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationContainer = page.locator('#orderPaymentSuccess');
    this.thankYouMessage = this.confirmationContainer.locator('h2');
    this.trackingNumber = page.locator('#trackingNumberLabel');
    this.orderNumber = page.locator('#orderNumberLabel');
    this.totalAmount = page.locator('label.total a');
  }

  async getOrderNumber(): Promise<string | null> {
    await expect(this.orderNumber).toBeVisible();
    await expect(this.orderNumber).not.toBeEmpty();
    return await this.orderNumber.textContent();
  }

  async getTrackingNumber(): Promise<string | null> {
    await expect(this.trackingNumber).not.toBeEmpty();
    return await this.trackingNumber.textContent();
  }

  async verifyTotal(expectedTotal: string) {
    const actualTotal = await this.totalAmount.textContent();
    expect(actualTotal?.trim()).toBe(expectedTotal);
  }

  async verifyThankYouMessage(message: string) {
    await expect(this.thankYouMessage).toContainText(message);
  }
}