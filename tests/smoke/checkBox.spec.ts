import {test} from "../../fixtures/checkBoxFixture"
import { expect, chromium} from '@playwright/test';
import { BasePage } from '../../pom/BasePage';
import {CheckBoxPage} from '../../pom/CheckBoxPage'

test('Check box select and check is selected', async ({page, optionNumber}) => {

  await page.goto('https://the-internet.herokuapp.com/');

  const basePage = new BasePage(page);

  await basePage.clickcheckBoxesLink();
  const checkboxPage = new CheckBoxPage(page);

  if(optionNumber ==='2'){
  await checkboxPage.checkCheckBox1();
  await checkboxPage.checkCheckBox2();
  }

  await expect( checkboxPage.checkBox1).toBeChecked();
  await expect( checkboxPage.checkBox2).toBeChecked();
});
