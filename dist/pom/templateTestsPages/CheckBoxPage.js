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
exports.CheckBoxPage = void 0;
class CheckBoxPage {
    constructor(page) {
        this.page = page;
        this.checkBox1 = page.locator('input[type="checkbox"]').nth(0);
        this.checkBox2 = page.locator('input[type="checkbox"]').nth(1);
    }
    checkCheckBox1() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkBox1.isChecked())) {
                //console.log("CHECK 11111"); ///for demo purpose
                yield this.checkBox1.check();
            }
        });
    }
    checkCheckBox2() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkBox2.isChecked())) {
                //console.log("CHECK 22222"); //for demo purpose
                yield this.checkBox2.check();
            }
        });
    }
}
exports.CheckBoxPage = CheckBoxPage;
//# sourceMappingURL=CheckBoxPage.js.map