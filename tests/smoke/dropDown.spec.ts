import { test, expect, chromium} from '@playwright/test';
import { BasePage } from '../../pom/BasePage';
import {DropDownPage} from '../../pom/DropDownPage'
import { delay } from '../../support/helpers';

test('Drop Down select and get selected text', async ({page}) => {

  await page.goto('https://the-internet.herokuapp.com/');

  const basePage = new BasePage(page);

  await basePage.clickDropDownLink();
  const ddPage = new DropDownPage(page);

  //Valid in some cases
  /*const dropDopwn = await page.$("select#dropdown");
  dropDopwn.selectOption("2");*/
  //await page.selectOption("select#dropdown","Option 2");

  await ddPage.setFromListDD('2');
  await delay(300);

  //Valid for some dd
  //const text = await page.$eval<string, HTMLSelectElement>("select#dropdown",ele => ele.value);

  const text = await ddPage.getSelectedDropDownText();
  //await console.log(text);


  expect(text).toBe('Option 2');
});


//DATA DRIVEN TEST
const dataArray = ['India','Brazil','Peru'];

dataArray.forEach(element => {

 test('Drop Down select and get selected text different site '+element , async ({page}) => {

    await page.goto('https://letcode.in/dropdowns');
  
    await page.selectOption("#country",element);
    const text = await page.$eval<string,HTMLSelectElement>("#country",elem=>elem.value)
  
    expect(text).toBe(element);
  });
}); 
