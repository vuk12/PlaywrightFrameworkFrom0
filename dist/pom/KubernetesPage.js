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
exports.KubernetesPage = void 0;
const helpers_1 = require("../support/helpers");
class KubernetesPage {
    constructor(page) {
        this.page = page;
        this.closeDialog = page.locator('//span[@class="pi pi-times"]');
        this.table = page.locator('xpath=//div[@class="ui-table-wrapper ng-star-inserted"]');
        this.tableBody = page.locator('xpath=//tbody[@class="ui-table-tbody"]');
    }
    clickCloseDialog() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.closeDialog.click();
        });
    }
    getAllVersionRowText() {
        return __awaiter(this, void 0, void 0, function* () {
            var listOfVersions = [];
            const rowCount = yield this.tableBody.locator('xpath=//tr').count();
            console.log(rowCount);
            for (let i = 0; i < rowCount; i++) {
                listOfVersions.push(yield this.tableBody.locator('tr').nth(i).locator('td').nth(5).innerText());
            }
            return listOfVersions;
        });
    }
    turnIntoNumber(get) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let shouldbeNumber = Number(get);
                resolve(shouldbeNumber);
            });
        });
    }
    isSameVersion(versionToDeploy) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, helpers_1.delay)(180000); //initial delay for version change
            var same = false;
            var watchDog = 0;
            while (!same && watchDog < 20) {
                (0, helpers_1.delay)(30000);
                this.page.reload();
                var listOfVersions = yield this.getAllVersionRowText();
                if (listOfVersions.length > 0 && listOfVersions[0] === versionToDeploy) {
                    if ((same = this.allEqual(listOfVersions))) {
                        break;
                    }
                }
                watchDog++;
            }
            return same;
        });
    }
    allEqual(arr) {
        return new Set(arr).size == 1;
    }
}
exports.KubernetesPage = KubernetesPage;
//# sourceMappingURL=KubernetesPage.js.map