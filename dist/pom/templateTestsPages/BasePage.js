"use strict";
//import { test, expect } from '@playwright/test';
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
exports.BasePage = void 0;
class BasePage {
    constructor(page) {
        this.page = page;
        this.basicAuthLink = page.locator('//a[contains(text(),"Basic Auth")]');
        this.checkBoxesLink = page.locator('//a[contains(text(),"Checkboxes")]');
        this.dropDownLink = page.locator('//a[contains(text(),"Dropdown")]');
        this.hoverLink = page.locator('//a[contains(text(),"Hovers")]');
        this.fileUploadLink = page.locator('//a[contains(text(),"File Upload")]');
    }
    clickBasicAuthLink() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.basicAuthLink.click();
        });
    }
    clickcheckBoxesLink() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkBoxesLink.click();
        });
    }
    clickDropDownLink() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dropDownLink.click();
        });
    }
    clickcHoverLink() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.hoverLink.click();
        });
    }
    clickcFileUploadLink() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fileUploadLink.click();
        });
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map