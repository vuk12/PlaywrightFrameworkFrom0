import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/templateTestsPages/LoginPage";

/*
test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});

test('Login with user name and password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  const loginPage = new LoginPage(page);
  await loginPage.loginUser('tomsmith','SuperSecretPassword!')
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
  const num= await loginPage.logOutButton.count();
  await expect( loginPage.logOutButton).toHaveCount(1);
});*/

test.describe("Tests from different sites", () => {
  test("basic test", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const title = page.locator(".navbar__inner .navbar__title");
    await expect(title).toHaveText("Playwright");
  });

  test("Login with user name and password", async ({ page }) => {
    await test.step("Navigate to Url", async () => {
      await page.goto("https://the-internet.herokuapp.com/login");
    });
    await test.step("Login into app", async () => {
      const loginPage = new LoginPage(page);
      await loginPage.loginUser("tomsmith", "SuperSecretPassword!");
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec wait just to show how to wait
      //const num = await loginPage.logOutButton.count();
      await expect(loginPage.logOutButton).toHaveCount(1);
    });
  });
});
