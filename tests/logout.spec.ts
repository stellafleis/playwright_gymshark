import { test } from '../POMs/fixture';
import { LoginPage } from '../POMs/loginPage';
import { expect } from '@playwright/test';


test('Logout', async ({ loginPage, page }) => {
    await loginPage.login;
    await loginPage.assertSuccessfulLogout();
});

test('Nonexistant logout modal', async ({ loginPage, page }) => {
    await loginPage.login;

    await loginPage.assertLogoutModalIsDisplayed();
});
