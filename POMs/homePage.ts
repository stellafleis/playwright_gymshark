import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly acceptCookiesButton: Locator;
    readonly acccountLink: Locator;
    readonly changeLanguageButton: Locator; 
    readonly locationModal: Locator;
    readonly languageDropdown: Locator;
    readonly countryDropdownn: Locator; 
    readonly confirmButton: Locator;
    readonly heartButton: Locator;
    readonly whishlistModal: Locator;
    readonly addedToWishlistPopup: Locator;
    readonly removedFromTheWishlist: Locator;
    readonly wishlistButton: Locator;
    readonly accessoriesLink: Locator;
    readonly whishlistItem: Locator;



constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All Cookies' });
    this.acccountLink = page.locator('.header_wrapper__ZQDOc > div:nth-child(5)');
    this.countryDropdownn = page.getByRole('combobox').first();
    this.confirmButton = page.getByRole('button', { name: 'confirm' });
    this.heartButton = page.locator('article').filter({ hasText: 'newnewquick addxssmlxlxxlLegacy T-Bar Sports Bralight supportWhite$44' }).getByLabel('Add');
    this.whishlistModal = page.getByLabel('Remove all wishlist products modal');
    this.addedToWishlistPopup = page.getByText('Item added to your wishlist');
    this.removedFromTheWishlist = page.getByText('Item removed from your wishlistUndo');
    this.wishlistButton = page.locator('.header_wrapper__ZQDOc > div:nth-child(4)');
    this.accessoriesLink = page.getByRole('link', { name: 'accessories', exact: true });

}

async acceptCookies() {
    await this.acceptCookiesButton.click();
}


async goToAccountPage(){
 await this.acccountLink.click();
}
async assertAccountPageLink(){
    await expect(this.page).toHaveURL('https://auth.gymshark.com/login?state=hKFo2SAydm9QUjFlaGNMUFF6b1NIN1VOWmFxSkFLY0I3cklZRaFupWxvZ2luo3RpZNkgMFpWRzBLMVphTjFrQmxHN193ZDJ1ZE8wd1ZBcFdPc1CjY2lk2SAyd2JDeUhWbTFEZElYMkV3ZEU3bTBxVkliWGpPQ1RYag&client=2wbCyHVm1DdIX2EwdE7m0qVIbXjOCTXj&protocol=oauth2&scope=openid%20profile%20email&response_type=code&redirect_uri=https%3A%2F%2Fus.shop.gymshark.com%2Fapi%2Fauth%2Fcallback&audience=https%3A%2F%2Fgateway.api.gymshark.com&locale=en-US&realm=us&multipass_redirect_uri=https%3A%2F%2Fus.shop.gymshark.com%2Faccount&nonce=UKttDvE00G3bMWoGaGslJBUsbNP3Z7lSNNSCEdSUb8s&code_challenge=Cs6ubTIAlWFV3VatiPjIP1G52ehFBqrY51iOVeoccbI&code_challenge_method=S256');
}




async assertLanguagegDropdownIsHidden() {
    await this.languageDropdown.isHidden();
}

async clickConfirm(){
    await this.confirmButton.click();
}



async assertSaveToWishlistModalIsDisplayed(){
    expect(this.whishlistModal).toBeVisible;

}

async saveToWishlist(){
    await this.accessoriesLink.click();
    await this.whishlistItem.click();

}

async assertSuccessfullAddToWishlist(){
    expect(this.addedToWishlistPopup).toBeVisible;

}

async goToTheWishlist(){
    await this.wishlistButton.click();
}

async assertRemoveFromTheWishlist(){
    await this.heartButton.click();
    await this.page.waitForTimeout(300);
    await this.heartButton.click();
    await this.page.waitForTimeout(300);
    expect(this.removedFromTheWishlist).toBeVisible;
    

}

}