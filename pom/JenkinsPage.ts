import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { delay } from "../support/helpers";

export class JenkinsPage{
    readonly page;

    private buildNow:Locator;
    private buildresultTable:Locator;
    private progressBar:Locator;
    private reportLink:Locator;
    private zipLink:Locator;


    constructor(page:Page)
    {
        this.page = page;
        this.buildNow = page.locator('xpath=//span[text()="Build Now"]');
        this.buildresultTable = page.locator('xpath=//table[@class="pane jenkins-pane stripped"]/tbody');
        this.progressBar= page.locator('css=td.progress-bar-left');
        this.reportLink = page.locator('xpath=//span[contains(text(),"report")]/ancestor::span')  
        this.zipLink = page.locator('id=zip_link')  
    }

    async clickBuildNow ():Promise<void>{
        await this.buildNow.click();
        //sometimes needs time and time to get build into tabele at the first place
        await delay(6000)
    }

    async getlastVersionBuild():Promise<string>{
        return await  this.buildresultTable.locator('xpath=//tr[2]//a[@class="model-link inside build-link display-name"]').innerText()
    }

    async progressBarNotPresent ():Promise<void>{
        await this.progressBar.waitFor({state:'detached',timeout: 360000})
        //sometimes needs time and time to get build into tabele at the first place
        await delay(6000)
    }

    async clickLastBuildIcon ():Promise<void>{
        await  this.buildresultTable.locator('xpath=//tr[2]//div[@class="build-icon"]').click()
    }

    async getBuildStatus ():Promise<string>{
        return await  this.buildresultTable.locator('xpath=//tr[2]//div[@class="build-icon"]/a').getAttribute('title')
    }

    async clickReportLink ():Promise<void>{
        await  this.reportLink.click()
    }

    async clickZipLink ():Promise<void>{
        await  this.zipLink.click()
    }
}