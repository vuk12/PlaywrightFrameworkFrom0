
import { Locator, Page } from "@playwright/test";

export class CheckBoxPage{
    readonly page;

    public checkBox1:Locator;
    public checkBox2:Locator;
    public selector

    constructor(page:Page)
    {
        this.page = page;
        this.checkBox1 = page.locator('input[type="checkbox"]').nth(0);
        this.checkBox2 = page.locator('input[type="checkbox"]').nth(1);

    }

    async checkCheckBox1 ():Promise<void>{
        if(!(await this.checkBox1.isChecked())){
            //console.log("CHECK 11111"); ///for demo purpose
            await this.checkBox1.check();
        }
    }

    async checkCheckBox2 ():Promise<void>{
        if(!(await this.checkBox2.isChecked())){
            //console.log("CHECK 22222"); //for demo purpose
            await this.checkBox2.check();
        }
    }

}