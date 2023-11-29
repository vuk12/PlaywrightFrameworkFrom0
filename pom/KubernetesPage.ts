
import { Locator, Page } from "@playwright/test";
import { delay } from "../support/helpers";

export class KubernetesPage{
    readonly page;

    private closeDialog:Locator;
    private table:Locator;
    private tableBody:Locator;


    constructor(page:Page)
    {
        this.page = page;
        this.closeDialog = page.locator('//span[@class="pi pi-times"]');
        this.table = page.locator('xpath=//div[@class="ui-table-wrapper ng-star-inserted"]');
        this.tableBody = page.locator('xpath=//tbody[@class="ui-table-tbody"]');
    }

    async clickCloseDialog ():Promise<void>{
        await this.closeDialog.click();
    }


    async getAllVersionRowText ():Promise<string[]>{

        var listOfVersions : string[]=[];
        const rowCount  = await this.tableBody.locator('xpath=//tr').count()
        console.log(rowCount)
        for (let i = 0; i < rowCount; i++) {
            listOfVersions.push(await this.tableBody.locator('tr').nth(i).locator('td').nth(5).innerText())
            }
        return listOfVersions;
    }

    async turnIntoNumber(get) : Promise<number> {
        return new Promise((resolve, reject) => {
          let shouldbeNumber : number =  Number(get);
          resolve(shouldbeNumber);
        });
      }

    async isSameVersion (versionToDeploy):Promise<boolean>{
        await delay(180000)//initial delay for version change
        var same = false
        var watchDog = 0;
        while(!same && watchDog<20){
            delay(30000)
            await this.page.reload()
            await this.clickCloseDialog();

            var listOfVersions : string[]=await this.getAllVersionRowText();
            if(listOfVersions.length>0 && listOfVersions[0]===versionToDeploy)
            {
                if((same = this.allEqual(listOfVersions)))
                {
                    break;
                }
            }
            watchDog++
        }

        return same
    }

    allEqual(arr:string[]) {
        return new Set(arr).size == 1;
    }

}