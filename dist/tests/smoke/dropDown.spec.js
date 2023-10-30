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
const DropDownPage_1 = require("../../pom/templateTestsPages/DropDownPage");
const helpers_1 = require("../../support/helpers");
(0, test_1.test)('Drop Down select and get selected text', ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto('https://the-internet.herokuapp.com/');
    const basePage = new BasePage_1.BasePage(page);
    yield basePage.clickDropDownLink();
    const ddPage = new DropDownPage_1.DropDownPage(page);
    //Valid in some cases
    /*const dropDopwn = await page.$("select#dropdown");
    dropDopwn.selectOption("2");*/
    //await page.selectOption("select#dropdown","Option 2");
    yield ddPage.setFromListDD('2');
    yield (0, helpers_1.delay)(300);
    //Valid for some dd
    //const text = await page.$eval<string, HTMLSelectElement>("select#dropdown",ele => ele.value);
    const text = yield ddPage.getSelectedDropDownText();
    //await console.log(text);
    (0, test_1.expect)(text).toBe('Option 2');
}));
//DATA DRIVEN TEST
const dataArray = ['India', 'Brazil', 'Peru'];
dataArray.forEach(element => {
    (0, test_1.test)('Drop Down select and get selected text different site ' + element, ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
        yield page.goto('https://letcode.in/dropdowns');
        yield page.selectOption("#country", element);
        const text = yield page.$eval("#country", elem => elem.value);
        (0, test_1.expect)(text).toBe(element);
    }));
});
//# sourceMappingURL=dropDown.spec.js.map