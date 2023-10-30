//import { test, expect } from '@playwright/test';

import { Locator, Page } from "@playwright/test";

export class BasePage{
    readonly page;

    private basicAuthLink:Locator;
    private checkBoxesLink:Locator;
    private dropDownLink:Locator;
    private dragDropLink:Locator;
    private hoverLink:Locator;
    private fileUploadLink:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.basicAuthLink = page.locator('//a[contains(text(),"Basic Auth")]');
        this.checkBoxesLink = page.locator('//a[contains(text(),"Checkboxes")]');
        this.dropDownLink = page.locator('//a[contains(text(),"Dropdown")]');
        this.hoverLink = page.locator('//a[contains(text(),"Hovers")]');
        this.fileUploadLink = page.locator('//a[contains(text(),"File Upload")]');

    }

    async clickBasicAuthLink ():Promise<void>{
        await this.basicAuthLink.click();
    }

    async clickcheckBoxesLink ():Promise<void>{
        await this.checkBoxesLink.click();
    }

    async clickDropDownLink ():Promise<void>{
        await this.dropDownLink.click();
    }

    async clickcHoverLink ():Promise<void>{
        await this.hoverLink.click();
    }

    async clickcFileUploadLink ():Promise<void>{
        await this.fileUploadLink.click();
    }

}