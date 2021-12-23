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
exports.LoginPage = void 0;
class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('id=username');
        this.password = page.locator('id=password');
        this.loginButton = page.locator('i[class *="fa-sign-in"]');
        this.logOutButton = page.locator('i[class*=icon-signout]');
    }
    fillUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.username.fill(username);
        });
    }
    fillPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.password.fill(password);
        });
    }
    clickLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loginButton.click();
        });
    }
    loginUser(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fillPassword(password);
            yield this.fillUserName(userName);
            yield this.clickLogin();
        });
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map