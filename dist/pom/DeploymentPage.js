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
exports.DeploymentPage = void 0;
const helpers_1 = require("../support/helpers");
class DeploymentPage {
    //span[@class='lozenge-wrapper']//span[text()='merged']
    constructor(page) {
        this.page = page;
        this.editButton = page.locator('//button[@class="aui-button in-browser-edit-button"]');
        this.version = page.locator('xpath=//span[text()="version"]/ancestor::span');
        this.commitButton = page.locator('xpath=//button[@title="Commit your changes"]');
        this.commitButtonPopUp1 = page.locator('xpath=//button[@class="aui-button aui-button-primary commit-button"]');
        this.continueButton = page.locator('xpath=//span[text()="Continue"]');
        this.textBoxCommit = page.locator('xpath=//div[@class="CodeMirror-lines"]');
        this.buttonAutoMerge = page.locator('xpath=//button[text()="Auto-Merge"]');
        this.buttonCreate = page.locator('xpath=//button[@type="submit"]');
        this.mergeIndicator = page.locator('//span[text()="merged"]');
        this.buildIndicator = page.locator('xpath=//span[text()="1 build in progress"]');
        this.buildSuccess = page.locator('xpath=//img[@class="build-status-icon build-successful-icon icon-size-small"]');
    }
    clickEditButton() {
        return __awaiter(this, void 0, void 0, function* () {
            this.editButton.click();
        });
    }
    getVersionText() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.version.innerText();
        });
    }
    editVersionText(newVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, helpers_1.delay)(1000);
            yield this.version.click({ clickCount: 3 });
            yield (0, helpers_1.delay)(1000);
            yield this.page.keyboard.type(newVersion);
            yield this.clickCommitButton();
        });
    }
    clickCommitButton() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commitButton.click();
        });
    }
    clickCommits() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commitButtonPopUp1.click();
            yield (0, helpers_1.delay)(1000);
            yield this.commitButtonPopUp1.click();
            yield (0, helpers_1.delay)(1000);
            yield this.clickContinue();
        });
    }
    clickContinue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.continueButton.click();
        });
    }
    setCommitMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.textBoxCommit.click();
            yield this.page.keyboard.type(message);
        });
    }
    clickAutoMergebutton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buttonAutoMerge.click();
        });
    }
    clickCreateButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buttonCreate.click();
        });
    }
    waitForAutoMergeToComplete(commitMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clickAutoMergebutton();
            yield this.setCommitMessage(commitMessage);
            yield this.clickCreateButton();
            yield this.buildSuccess.waitFor({ state: 'visible', timeout: 300000 });
            yield this.mergeIndicator.waitFor({ state: 'visible', timeout: 300000 });
        });
    }
}
exports.DeploymentPage = DeploymentPage;
//# sourceMappingURL=DeploymentPage.js.map