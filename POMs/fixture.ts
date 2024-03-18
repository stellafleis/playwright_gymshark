import { test as base } from '@playwright/test';
import { LoginPage } from './loginPage';
import { HomePage } from './homePage';
import { LoginEnvironments } from '../environments/loginEnvironments';

type MyFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        const loginEnvironments = new LoginEnvironments(page);

        await page.goto(loginEnvironments.baseUrl);
        await homePage.acceptCookies();
        await homePage.goToAccountPage();

        const loginPage = new LoginPage(page);

        await loginPage.login(loginEnvironments.correctEmail, loginEnvironments.correctPassword);
        await loginPage.assertLoggedInPageIsDisplayed();
        await loginPage.assertHomePageButton();

        await use(loginPage);
    },
});

export { expect } from '@playwright/test';
