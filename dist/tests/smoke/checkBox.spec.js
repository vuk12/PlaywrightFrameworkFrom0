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
const checkBoxFixture_1 = require("../../fixtures/checkBoxFixture");
const test_1 = require("@playwright/test");
const BasePage_1 = require("../../pom/templateTestsPages/BasePage");
const CheckBoxPage_1 = require("../../pom/templateTestsPages/CheckBoxPage");
(0, checkBoxFixture_1.test)('Check box select and check is selected', ({ page, optionNumber }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto('https://the-internet.herokuapp.com/');
    const basePage = new BasePage_1.BasePage(page);
    yield basePage.clickcheckBoxesLink();
    const checkboxPage = new CheckBoxPage_1.CheckBoxPage(page);
    if (optionNumber === '2') {
        yield checkboxPage.checkCheckBox1();
        yield checkboxPage.checkCheckBox2();
    }
    yield (0, test_1.expect)(checkboxPage.checkBox1).toBeChecked();
    yield (0, test_1.expect)(checkboxPage.checkBox2).toBeChecked();
}));
//# sourceMappingURL=checkBox.spec.js.map