import { expect, test } from '@playwright/test';
import { HomePage } from '../POMs/homePage';
import { LoginPage } from '../POMs/loginPage';
import { LoginEnvironments } from '../environments/loginEnvironments';

test('Login with correct credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);

    await loginPage.login(loginEnvironments.correctEmail, loginEnvironments.correctPassword);
    await loginPage.assertLoggedInPageIsDisplayed();
});

test('Login with incorrect credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments  = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);

    await loginPage.login(loginEnvironments.incorrectEmail, loginEnvironments.incorrectPassword);
    await loginPage.assertLoginErrorMessageIsDisplayed();

});

test('Login with empty fields',async ({page}) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);
    await loginPage.assertEmptyFieldLoginError();
    
})

test('Forgot Password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginEnvironments = new LoginEnvironments(page);

    await page.goto(loginEnvironments.baseUrl);
    await homePage.acceptCookies();
    await homePage.goToAccountPage();


    const loginPage = new LoginPage(page);
    await loginPage.assertForgottenPassword();
});

