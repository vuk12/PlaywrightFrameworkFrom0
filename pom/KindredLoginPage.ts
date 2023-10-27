import { Locator, Page } from "@playwright/test";

export class KindredLoginPage{
    readonly page;

    private username:Locator;
    private password:Locator;
    private nextButton:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.username = page.locator('id=i0116');
        this.password = page.locator('id=i0118');
        this.nextButton= page.locator('id=idSIButton9');
    }

    async fillUserName (username):Promise<void>{
        await this.username.click();
        await this.username.fill(username);
    }

        async fillPassword (password):Promise<void>{
            await this.password.fill(password);
        }

    async clickNext ():Promise<void>{
       await this.nextButton.click();
    }

    async loginUser(userName:string,password:string):Promise<void>{
        await this.fillUserName(userName);
        await this.clickNext();
        await this.fillPassword(password);
        await this.clickNext();
        await this.clickNext();
    }

}