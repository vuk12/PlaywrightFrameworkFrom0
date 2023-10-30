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
exports.KindredLoginPage = void 0;
class KindredLoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('id=i0116');
        this.password = page.locator('id=i0118');
        this.nextButton = page.locator('id=idSIButton9');
    }
    fillUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.username.click();
            yield this.username.fill(username);
        });
    }
    fillPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.password.fill(password);
        });
    }
    clickNext() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nextButton.click();
        });
    }
    loginUser(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fillUserName(userName);
            yield this.clickNext();
            yield this.fillPassword(password);
            yield this.clickNext();
            yield this.clickNext();
        });
    }
}
exports.KindredLoginPage = KindredLoginPage;
//# sourceMappingURL=KindredLoginPage.js.map