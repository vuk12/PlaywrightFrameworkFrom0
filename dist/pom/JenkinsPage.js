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
exports.JenkinsPage = void 0;
const helpers_1 = require("../support/helpers");
class JenkinsPage {
    constructor(page) {
        this.page = page;
        this.buildNow = page.locator('xpath=//span[text()="Build Now"]');
        this.buildresultTable = page.locator('xpath=//table[@class="pane jenkins-pane stripped"]/tbody');
        this.progressBar = page.locator('css=td.progress-bar-left');
    }
    clickBuildNow() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buildNow.click();
            //sometimes needs time and time to get build into tabele at the first place
            yield (0, helpers_1.delay)(6000);
        });
    }
    getlastVersionBuild() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.buildresultTable.locator('xpath=//tr[2]//a[@class="model-link inside build-link display-name"]').innerText();
        });
    }
    progressBarNotPresent() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.progressBar.waitFor({ state: 'detached', timeout: 360000 });
            //sometimes needs time and time to get build into tabele at the first place
            yield (0, helpers_1.delay)(6000);
        });
    }
}
exports.JenkinsPage = JenkinsPage;
//# sourceMappingURL=JenkinsPage.js.map