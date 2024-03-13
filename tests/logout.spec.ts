import { test, expect } from '@playwright/test';
import { LoginPage } from '../POMs/loginPage';
import { HomePage } from '../POMs/homePage';
import { LoginEnvironments } from '../environments/loginEnvironments';


test('Logout', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();

 
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);

    await loginPage.login(loginEnvironments.correctEmail, loginEnvironments.correctPassword);
    await loginPage.assertLoggedInPageIsDisplayed();

    await loginPage.assertSuccessfulLogout();
});

test('Nonexistant logout modal', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);
    await loginPage.login(loginEnvironments.correctEmail, loginEnvironments.correctPassword);
    await loginPage.assertLoggedInPageIsDisplayed();

    await loginPage.assertLogoutModalIsDisplayed();
});
