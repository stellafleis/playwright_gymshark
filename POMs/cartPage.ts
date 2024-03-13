
import { expect, Locator, Page } from '@playwright/test';

export class CartPage {

    page: Page;
    readonly checkout: Locator;
    readonly shippingInformation: Locator;
    readonly giftCard: Locator;
    readonly applyButton: Locator;
    readonly errorDiscountMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkout = page.getByRole('link', { name: 'Checkout securely' });
        this.shippingInformation = page.locator('div.section.section--shipping-address');
        this.giftCard = page.getByPlaceholder('Discount code or gift card');
        this.applyButton = page.getByRole('button', { name: 'Apply Discount Code' });
        this.errorDiscountMessage = page.getByText('Enter a valid discount code or gift card'); 

    }


    async assertCheckout() {
        await this.checkout.click();
        expect(this.shippingInformation).toBeVisible;
    }


    async gifcardInput() {
        await this.giftCard.fill('10%OFF');
        await this.applyButton.click();
    }

    async assertDiscountErrorMessage() {
        expect(this.errorDiscountMessage).toBeVisible;
    }
}