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
exports.ReleaseRequestTicket = void 0;
class ReleaseRequestTicket {
    constructor(page) {
        this.page = page;
        this.status = page.locator('xpath=//span[@id="status-val"]/span');
        this.version = page.locator('xpath=//span[@id="fixVersions-field"]/a');
        this.component = page.locator('xpath=//span[@id="components-field"]/a');
        this.browseLink = page.locator('id=attachment-browse-button');
    }
    getReleaseRequestStatusText() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.status.innerText();
        });
    }
    getVersionText() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.version.innerText();
        });
    }
    getComponentText() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.component.innerText();
        });
    }
    clickBrowseLink() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browseLink.click();
        });
    }
}
exports.ReleaseRequestTicket = ReleaseRequestTicket;
//# sourceMappingURL=ReleaseRequestTicket.js.map