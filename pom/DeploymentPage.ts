
import { Locator, Page } from "@playwright/test";
import { delay } from "../support/helpers";

export class DeploymentPage{
    readonly page:Page;

    public editButton:Locator;
    public version:Locator;
    public commitButton:Locator;
    public commitButtonPopUp1:Locator;
    public continueButton:Locator;

    public textBoxCommit:Locator;
    public buttonAutoMerge:Locator;
    public buttonCreate:Locator;
    public mergeIndicator:Locator;
    public buildIndicator:Locator;
    public buildSuccess:Locator;
    

//span[@class='lozenge-wrapper']//span[text()='merged']
    constructor(page:Page)
    {
        this.page = page;
        this.editButton = page.locator('//button[@class="aui-button in-browser-edit-button"]')
        this.version = page.locator('xpath=//span[text()="version"]/ancestor::span')
        this.commitButton = page.locator('xpath=//button[@title="Commit your changes"]')
        this.commitButtonPopUp1 = page.locator('xpath=//button[@class="aui-button aui-button-primary commit-button"]')
        this.continueButton = page.locator('xpath=//span[text()="Continue"]')

        this.textBoxCommit = page.locator('xpath=//div[@class="CodeMirror-lines"]')
        this.buttonAutoMerge = page.locator('xpath=//button[text()="Auto-Merge"]')
        this.buttonCreate = page.locator('xpath=//button[@type="submit"]')
        this.mergeIndicator = page.locator('//span[text()="merged"]')
        this.buildIndicator = page.locator('xpath=//span[text()="1 build in progress"]')
        
        this.buildSuccess = page.locator('xpath=//img[@class="build-status-icon build-successful-icon icon-size-small"]')
    }

    
    async clickEditButton ():Promise<void>{
        this.editButton.click()
    }

    async getVersionText ():Promise<string>{
        return this.version.innerText()
    }

    async editVersionText (newVersion:string):Promise<void>{
        await delay(1000);
        await this.version.click({ clickCount: 3 })
        await delay(1000);
        await this.page.keyboard.type(newVersion)
        await this.clickCommitButton()
    }

    async clickCommitButton ():Promise<void>{
        return this.commitButton.click()
    }

    async clickCommits ():Promise<void>{
         await this.commitButtonPopUp1.click()
         await delay(1000);
         await this.commitButtonPopUp1.click()
         await delay(1000);
         await this.clickContinue()
    }

    async clickContinue():Promise<void>{
        await this.continueButton.click()
   }


   async setCommitMessage (message:string):Promise<void>{
        await this.textBoxCommit.click()
        await this.page.keyboard.type(message)
    }

    async clickAutoMergebutton ():Promise<void>{
        await this.buttonAutoMerge.click()
    }

    async clickCreateButton ():Promise<void>{
        await this.buttonCreate.click()
    }

    async waitForAutoMergeToComplete(commitMessage:string):Promise<void>{
        await delay(2000)
        await this.clickAutoMergebutton()
        await this.setCommitMessage(commitMessage)
        await this.clickCreateButton()
        await this. buildSuccess.waitFor({state:'visible',timeout: 300000})
        await this.mergeIndicator.waitFor({state:'visible',timeout: 300000})
    }

}
