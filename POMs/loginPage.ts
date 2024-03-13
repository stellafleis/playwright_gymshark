import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly emailInputField: Locator;
    readonly passwordInputField: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    readonly forgotPasswordLink: Locator;
    readonly logoutLink: Locator;
    readonly logoutModal: Locator; 
    readonly homePageButton: Locator;
    
    

        
            constructor(page: Page) {
                this.page = page;
                this.emailInputField = page.getByRole('textbox', { name: 'Email Address' });
                this.passwordInputField = page.getByRole('textbox', { name: 'Password' });
                this.loginButton = page.getByRole('button', { name: 'Log in' });
                this.loginErrorMessage = page.getByText('Wrong email or password.');
                this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
                this.logoutLink = page.getByRole('link', { name: 'Log out' });
                this.logoutModal = page.getByText('Do you want to Log out from the account? Cancel Confirm');
                this.homePageButton = page.getByRole('link', { name: 'Gymshark', exact: true });
            }
        
    async login(emailValue: string, passwordValue: string){
        await this.emailInputField.fill(emailValue);
        await this.passwordInputField.fill(passwordValue);
        await this.loginButton.click();
    }

    async assertLoggedInPageIsDisplayed(){
        const element =  this.page.getByText('Your Gymshark Account');
         expect(element !== undefined ).toBeTruthy();
    }

    async assertLoginErrorMessageIsDisplayed(){
        await expect(this.loginErrorMessage).toBeVisible();
    }



    async assertForgottenPassword(){
        await this.forgotPasswordLink.click();
        expect (this.page.getByRole('heading').filter({ hasText: 'Reset your password' }));
    }

    async assertSuccessfulLogout(){
        await this.logoutLink.click();
        await expect(this.page).toHaveURL('https://www.gymshark.com/');


    }

    async assertLogoutModalIsDisplayed(){
        await this.logoutLink.click();
        await expect(this.logoutModal).toBeHidden();

        
    }

    async assertHomePageButton(){
        await this.homePageButton.click();
        await expect(this.page).toHaveURL('https://www.gymshark.com/');
    }

     async assertEmptyFieldLoginError(){
        await this.loginButton.click();
        await this.page.locator('input#email[required]');
        }

    }

