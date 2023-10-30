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
exports.HandleDeployments = void 0;
const helpers_1 = require("./helpers");
class HandleDeployments {
    createPrAndMerge(version, deploymentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            var versionPrefix = 'version: ';
            yield deploymentPage.clickEditButton();
            yield deploymentPage.editVersionText(versionPrefix.concat(version));
            yield deploymentPage.clickCommits();
            yield (0, helpers_1.delay)(1000);
            yield deploymentPage.waitForAutoMergeToComplete('[Auto] Update version to: '.concat(version));
            yield (0, helpers_1.delay)(2000);
        });
    }
}
exports.HandleDeployments = HandleDeployments;
//# sourceMappingURL=HandleDeployments.js.map