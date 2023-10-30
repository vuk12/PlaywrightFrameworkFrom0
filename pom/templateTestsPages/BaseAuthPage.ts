//import { test, expect } from '@playwright/test';

import { Locator, Page } from "@playwright/test";

export class BaseAuthPage{
    readonly page;

    public basicAuthHeaderText:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.basicAuthHeaderText = page.locator('//h3[contains(text(),"Basic Auth")]');

    }

    async getBasicAuthHeaderText ():Promise<void>{
        await this.basicAuthHeaderText.innerText();
    }

}