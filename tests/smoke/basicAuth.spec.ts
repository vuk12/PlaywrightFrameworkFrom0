import { test, expect, chromium} from '@playwright/test';
import { BasePage } from '../../pom/BasePage';
import {BaseAuthPage} from '../../pom/BaseAuthPage'

test('Basic Auth Test ', async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext({
      httpCredentials:{
        username: 'admin',
        password: 'admin'
      }
  });
  //const page = await browser.newPage(); //it will not work since it not using context for creating new page
  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/');

  const basePage = new BasePage(page);

  await basePage.clickBasicAuthLink();
  const baseAuthPage = new BaseAuthPage(page);

  const num = await baseAuthPage.basicAuthHeaderText.count();
  console.log(num);

  await expect( baseAuthPage.basicAuthHeaderText).toHaveCount(1);
  await context.close();
});
