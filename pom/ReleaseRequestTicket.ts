
import { Locator, Page } from "@playwright/test";

export class ReleaseRequestTicket{
    readonly page:Page;

    public status:Locator;
    public version:Locator;
    public component:Locator;
    public browseLink:Locator;


    constructor(page:Page)
    {
        this.page = page;
        this.status = page.locator('xpath=//span[@id="status-val"]/span');
        this.version = page.locator('xpath=//span[@id="fixVersions-field"]/a');
        this.component = page.locator('xpath=//span[@id="components-field"]/a');
        this.browseLink = page.locator('id=attachment-browse-button');
        
    }

    async getReleaseRequestStatusText ():Promise<string>{
        return this.status.innerText();
    }

    async getVersionText ():Promise<string>{
        return this.version.innerText();
    }

    async getComponentText ():Promise<string>{
        return this.component.innerText();
    }

    async clickBrowseLink ():Promise<void>{
        await this.browseLink.click();
    }
}