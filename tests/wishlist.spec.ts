import { test } from '../POMs/fixture';
import { HomePage } from '../POMs/homePage';
import { LoginEnvironments } from '../environments/loginEnvironments';
import { WishlistPage } from '../POMs/wishlistPage';
import { AccessoriesPage } from '../POMs/accessoriesPage';

test('Cant add to wishlist if not logged in', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.saveToWishlist();

    await accessoriesPage.assertSaveToWishlistModalIsDisplayed();
});


test('Add to wishlist', async ({ loginPage, page }) => {
    await loginPage.login;

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.saveToWishlist();
    await accessoriesPage.assertSuccessfulAddToWishlist();
});



test('Remove from the wishlist', async ({ loginPage, page }) => {
    await loginPage.login;

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.saveToWishlist();
    await accessoriesPage.assertRemoveFromTheWishlist();
});


test('Remove all items from the wishlist', async ({ loginPage, page }) => {
    await loginPage.login;
    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.wishlistMultipleItems();

    const homePage = new HomePage(page);
    await homePage.goToTheWishlist();

    const wishlistPage = new WishlistPage(page);
    await wishlistPage.allItemsAreRemoved();
});

