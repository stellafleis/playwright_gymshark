import { test, expect } from '@playwright/test';
import { HomePage } from '../POMs/homePage';
import { LoginEnvironments } from '../environments/loginEnvironments';
import { AccessoriesPage } from '../POMs/accessoriesPage';
import { CartPage } from '../POMs/cartPage';




test('Quick add in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.quickAddToCart();
    await accessoriesPage.assertCartModalIsVisible()


});


test('Add to cart from detail page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.addToCartDetailPage();
    await accessoriesPage.assertCartModalIsVisible();

});

test('Delete item from cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.addToCartDetailPage();
    await accessoriesPage.assertCartModalIsVisible();
    await accessoriesPage.deleteFromCart();

});

test('Go to checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.quickAddToCart();
    await accessoriesPage.assertCartModalIsVisible();

    const cartPage = new CartPage(page);
    await cartPage.assertCheckout();

});

test('Wrong discount code ', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.quickAddToCart();
    await accessoriesPage.assertCartModalIsVisible();

    const cartPage = new CartPage(page);
    await cartPage.assertCheckout();
    await cartPage.gifcardInput();
    await cartPage.assertDiscountErrorMessage();
});