"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../../pom/templateTestsPages/LoginPage");
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
test_1.test.describe("Tests from different sites", () => {
    (0, test_1.test)("basic test", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
        yield page.goto("https://playwright.dev/");
        const title = page.locator(".navbar__inner .navbar__title");
        yield (0, test_1.expect)(title).toHaveText("Playwright");
    }));
    (0, test_1.test)("Login with user name and password", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
        yield test_1.test.step("Navigate to Url", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page.goto("https://the-internet.herokuapp.com/login");
        }));
        yield test_1.test.step("Login into app", () => __awaiter(void 0, void 0, void 0, function* () {
            const loginPage = new LoginPage_1.LoginPage(page);
            yield loginPage.loginUser("tomsmith", "SuperSecretPassword!");
            yield new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec wait just to show how to wait
            //const num = await loginPage.logOutButton.count();
            yield (0, test_1.expect)(loginPage.logOutButton).toHaveCount(1);
        }));
    }));
});
//# sourceMappingURL=loginPage.spec.js.map