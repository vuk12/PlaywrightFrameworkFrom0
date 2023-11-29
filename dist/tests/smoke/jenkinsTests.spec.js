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
const test_1 = require("@playwright/test");
const helpers_1 = require("../../support/helpers");
const JenkinsPage_1 = require("../../pom/JenkinsPage");
const KindredLoginPage_1 = require("../../pom/KindredLoginPage");
const ReleaseRequestTicket_1 = require("../../pom/ReleaseRequestTicket");
const fs_extra_1 = require("fs-extra");
// import { generateString } from "../../support/helpers" 
const extract = require('extract-zip');
(0, test_1.test)("Wait forrrr Jenkins build to complete", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    yield test_1.test.step("Login into Jenkins", () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.goto("https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/qa1/job/se-affordability-gateway/");
        const loginPage = new KindredLoginPage_1.KindredLoginPage(page);
        yield loginPage.loginUser("vukadin.glogovac@kindredgroup.com", "Vanjaradovanovic30+");
    }));
    yield test_1.test.step("Navigate to Url", () => __awaiter(void 0, void 0, void 0, function* () {
        const jenkinsPage = new JenkinsPage_1.JenkinsPage(page);
        yield jenkinsPage.clickBuildNow();
        yield jenkinsPage.progressBarNotPresent();
        const version = yield jenkinsPage.getlastVersionBuild();
        if ((yield jenkinsPage.getBuildStatus()).includes('Success')) {
            yield jenkinsPage.clickLastBuildIcon();
            yield jenkinsPage.clickReportLink();
            const downloadPromise = page.waitForEvent('download');
            yield jenkinsPage.clickZipLink();
            const download = yield downloadPromise;
            (0, helpers_1.delay)(2000); //who know how long it takes
            // const randomFileName = generateString(4)
            const fullFilePath = __dirname + download.suggestedFilename();
            console.log(fullFilePath);
            yield download.saveAs(fullFilePath);
            try {
                const destinationPath = __dirname + '/unzip';
                yield extract(fullFilePath, { dir: destinationPath });
                console.log('Extraction complete');
                yield page.goto("https://jira.kindredgroup.com/browse/KCI-915");
                const fileChooserPromise = page.waitForEvent('filechooser');
                const rrTicket = new ReleaseRequestTicket_1.ReleaseRequestTicket(page);
                yield rrTicket.clickBrowseLink();
                const fileChooser = yield fileChooserPromise;
                yield fileChooser.setFiles(destinationPath + '/SE-extent-report/emailable-report.html');
                (0, fs_extra_1.removeSync)(destinationPath);
            }
            catch (err) {
                console.log('Da nije mozda');
            }
        }
        yield (0, helpers_1.delay)(3000);
        yield page.goto("https://b92.net");
        yield (0, helpers_1.delay)(3000);
    }));
}));
//# sourceMappingURL=jenkinsTests.spec.js.map