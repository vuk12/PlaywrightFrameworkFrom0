
import { Locator, Page } from "@playwright/test";

export class DropDownPage{
    readonly page:Page;

    public listDropDown:Locator;
    public selectedDDtext:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.listDropDown = page.locator('id=dropdown');
        this.selectedDDtext = page.locator('#dropdown [selected="selected"]');

    }

    async setFromListDD (dropDownOptionText:string):Promise<void>{
        this.listDropDown.selectOption(dropDownOptionText);
        
    }

    async getSelectedDropDownText ():Promise<string>{
        return this.selectedDDtext.innerText();
    }

    async getSelectedOption ():Promise<string>{

        //Will provide every option text
        //return await this.page.$eval('#dropdown', sel => sel.textContent)
        return await this.page.$eval<string, HTMLSelectElement>('select[id="dropdown"]',(ele) => ele.value);
    }


}