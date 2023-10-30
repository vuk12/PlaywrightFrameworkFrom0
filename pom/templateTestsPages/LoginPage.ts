//import { test, expect } from '@playwright/test';

import { Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page;

    private username:Locator;
    private password:Locator;
    private loginButton:Locator;
    public logOutButton:Locator;


    constructor(page:Page)
    {
        this.page = page;
        this.username = page.locator('id=username');
        this.password = page.locator('id=password');
        this.loginButton = page.locator('i[class *="fa-sign-in"]');
        this.logOutButton = page.locator('i[class*=icon-signout]');

    }

    async fillUserName (username):Promise<void>{
        await this.username.fill(username);
    }

        async fillPassword (password):Promise<void>{
            await this.password.fill(password);
        }
    async clickLogin ():Promise<void>{
       await this.loginButton.click();
    }

    async loginUser(userName:string,password:string):Promise<void>{
        await this.fillPassword(password);
        await this.fillUserName(userName);
        await this.clickLogin();
    }

}