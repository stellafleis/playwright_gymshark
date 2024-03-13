import { test, expect } from '@playwright/test';
import { HomePage } from '../POMs/homePage';
import { LoginPage } from '../POMs/loginPage';
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


test('Add to wishlist', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);

    await loginPage.login(loginEnvironments.correctEmail, loginEnvironments.correctPassword);
    await loginPage.assertLoggedInPageIsDisplayed();
    await loginPage.assertHomePageButton();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.saveToWishlist();
    await accessoriesPage.assertSuccessfulAddToWishlist();
 


});

test('Remove from the wishlist', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();


    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);

    await loginPage.login(loginEnvironments.correctEmail, loginEnvironments.correctPassword);
    await loginPage.assertLoggedInPageIsDisplayed();
    await loginPage.assertHomePageButton();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.saveToWishlist();
    await accessoriesPage.assertRemoveFromTheWishlist();



});


test('Remove all items from the wishlist', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);
    await loginPage.login(loginEnvironments.correctEmail, loginEnvironments.correctPassword);
    await loginPage.assertLoggedInPageIsDisplayed();
    await loginPage.assertHomePageButton();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.wishlistMultipleItems();
    await homePage.goToTheWishlist();

    const wishlistPage = new WishlistPage(page);
    await wishlistPage.allItemsAreRemoved();


});

