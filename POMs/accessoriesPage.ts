import { expect, Locator, Page } from '@playwright/test';

export class AccessoriesPage {
    readonly page: Page;
    readonly wishlistModal: Locator;
    readonly addedToWishlistPopup: Locator;
    readonly removedFromTheWishlist: Locator;
    readonly wishlistButton: Locator;
    readonly accessoriesLink: Locator;
    readonly productItem: Locator;
    readonly productItemTwo: Locator;
    readonly removeItem: Locator;
    readonly quickAdd: Locator;
    readonly sizePicker: Locator;
    readonly addToBag: Locator;
    readonly cartView: Locator;
    readonly deleteItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistModal = page.getByLabel('Remove all wishlist products modal');
        this.addedToWishlistPopup = page.getByText('Item added to your wishlist');
        this.removedFromTheWishlist = page.getByText('Item removed from your wishlist');
        this.wishlistButton = page.locator('.header_wrapper__ZQDOc > div:nth-child(4)');
        this.accessoriesLink = page.getByRole('link', { name: 'accessories sale', exact: true });
        this.productItem = page.locator('div.product-grid_grid__UbelU > article:nth-child(1)');
        this.productItemTwo = page.locator('div.product-grid_grid__UbelU > article:nth-child(2)');
        this.removeItem = page.locator('div.product-grid_grid__UbelU > article:nth-child(1)').getByLabel('Remove');
        this.quickAdd = page.locator('div.product-grid_grid__UbelU > article:nth-child(1)').getByRole('button').first();
        this.sizePicker = page.locator('[data-locator-id="pdp-size-s-select"]');
        this.addToBag = page.getByRole('button', { name: 'Add to bag' });
        this.cartView = page.getByText('Your bag');
        this.deleteItem = page.locator('i.icon-delete');

    }

    async assertSaveToWishlistModalIsDisplayed() {
        expect(this.wishlistModal).toBeVisible;
    }

    async saveToWishlist() {
        await this.accessoriesLink.click();
        await this.productItem.getByLabel('Add').click();
    }

    async wishlistMultipleItems() {
        await this.accessoriesLink.click();
        await this.productItem.getByLabel('Add').click();
        await this.productItemTwo.getByLabel('Add').click();
    }

    async assertSuccessfulAddToWishlist() {
        expect(this.addedToWishlistPopup).toBeVisible;
    }

    async goToTheWishlist() {
        await this.wishlistButton.click();
    }


    async assertRemoveFromTheWishlist() {
        await this.removeItem.click();
        expect(this.removedFromTheWishlist).toBeVisible;
    }

    async quickAddToCart() {
        await this.accessoriesLink.click();
        await this.productItem.hover();
        await this.quickAdd.click();
    }

    async addToCartDetailPage() {
        await this.accessoriesLink.click();
        await this.productItem.click();
        await this.sizePicker.click();
        await this.addToBag.click();
    }

    async assertCartModalIsVisible() {
        await expect(this.cartView).toBeVisible();
    }

    async deleteFromCart() {
        await this.deleteItem.click();
    }


}

