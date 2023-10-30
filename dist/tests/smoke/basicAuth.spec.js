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
const BasePage_1 = require("../../pom/templateTestsPages/BasePage");
const BaseAuthPage_1 = require("../../pom/templateTestsPages/BaseAuthPage");
(0, test_1.test)('Basic Auth Test ', () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield test_1.chromium.launch();
    const context = yield browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });
    //const page = await browser.newPage(); //it will not work since it not using context for creating new page
    const page = yield context.newPage();
    yield page.goto('https://the-internet.herokuapp.com/');
    const basePage = new BasePage_1.BasePage(page);
    yield basePage.clickBasicAuthLink();
    const baseAuthPage = new BaseAuthPage_1.BaseAuthPage(page);
    const num = yield baseAuthPage.basicAuthHeaderText.count();
    console.log(num);
    yield (0, test_1.expect)(baseAuthPage.basicAuthHeaderText).toHaveCount(1);
    yield context.close();
}));
//# sourceMappingURL=basicAuth.spec.js.map