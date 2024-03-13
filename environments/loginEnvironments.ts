import { Page } from '@playwright/test';

export class LoginEnvironments {
    page: Page;
    baseUrl: string;
    correctEmail: string;
    correctPassword: string;
    incorrectEmail: string;
    incorrectPassword: string;


    constructor(page: Page) {
        this.page = page;
        this.baseUrl = 'https://www.gymshark.com/';
        this.correctEmail = 'gafayax959@pbridal.com';
        this.correctPassword = 'Test123!';
        this.incorrectEmail = 'stella.fl@wrong.com';
        this.incorrectPassword = 'Test1';
    }
}
