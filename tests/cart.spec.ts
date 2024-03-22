import { test } from '../POMs/fixture';
import { expect } from '@playwright/test';
import { AccessoriesPage } from '../POMs/accessoriesPage';
import { CartPage } from '../POMs/cartPage';

test('Quick add in Cart', async ({ loginPage, page }) => {
    await loginPage.login;

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.quickAddToCart();
    await accessoriesPage.assertCartModalIsVisible()
});


test('Add to cart from detail page', async ({ loginPage, page }) => {
    await loginPage.login;

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.addToCartDetailPage();
    await accessoriesPage.assertCartModalIsVisible();
});

test('Delete item from cart', async ({ loginPage, page }) => {
    await loginPage.login;

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.addToCartDetailPage();
    await accessoriesPage.assertCartModalIsVisible();
    await accessoriesPage.deleteFromCart()
});

test('Go to checkout', async ({ loginPage, page }) => {
    await loginPage.login;

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.quickAddToCart();
    await accessoriesPage.assertCartModalIsVisible();

    const cartPage = new CartPage(page);
    await cartPage.assertCheckout()
});

test('Wrong discount code ', async ({ loginPage, page }) => {
    await loginPage.login;

    const accessoriesPage = new AccessoriesPage(page);
    await accessoriesPage.quickAddToCart();
    await accessoriesPage.assertCartModalIsVisible();

    const cartPage = new CartPage(page);
    await cartPage.assertCheckout();
    await cartPage.gifcardInput();
    await cartPage.assertDiscountErrorMessage();
});