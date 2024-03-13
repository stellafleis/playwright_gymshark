import { expect, Locator, Page } from '@playwright/test';

export class WishlistPage {
    readonly page: Page;
    readonly removeAllItemLink: Locator;
    readonly emptyWishlist: Locator;
    readonly removeAllWishlistProductsModal: Locator;
    readonly yesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.removeAllItemLink = page.locator('i.icon-delete');
        this.removeAllWishlistProductsModal = page.getByLabel('Remove all wishlist products modal');
        this.yesButton = page.getByRole('button', { name: 'Yes' });
        this.emptyWishlist = page.getByRole('heading', { name: 'your wishlist is empty' });

    }

    async allItemsAreRemoved() {
        await this.removeAllItemLink.click();   
        await expect(this.removeAllWishlistProductsModal).toBeVisible();
        await this.yesButton.click();
        await expect(this.emptyWishlist).toBeVisible();
    }
    
}
