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
exports.DropDownPage = void 0;
class DropDownPage {
    constructor(page) {
        this.page = page;
        this.listDropDown = page.locator('id=dropdown');
        this.selectedDDtext = page.locator('#dropdown [selected="selected"]');
    }
    setFromListDD(dropDownOptionText) {
        return __awaiter(this, void 0, void 0, function* () {
            this.listDropDown.selectOption(dropDownOptionText);
        });
    }
    getSelectedDropDownText() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.selectedDDtext.innerText();
        });
    }
    getSelectedOption() {
        return __awaiter(this, void 0, void 0, function* () {
            //Will provide every option text
            //return await this.page.$eval('#dropdown', sel => sel.textContent)
            return yield this.page.$eval('select[id="dropdown"]', (ele) => ele.value);
        });
    }
}
exports.DropDownPage = DropDownPage;
//# sourceMappingURL=DropDownPage.js.map