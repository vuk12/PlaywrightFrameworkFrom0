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
const KindredLoginPage_1 = require("../../pom/KindredLoginPage");
const ReleaseRequestTicket_1 = require("../../pom/ReleaseRequestTicket");
const helpers_1 = require("../../support/helpers");
const DeploymentPage_1 = require("../../pom/DeploymentPage");
const KubernetesPage_1 = require("../../pom/KubernetesPage");
const HandleDeployments_1 = require("../../support/HandleDeployments");
const JenkinsPage_1 = require("../../pom/JenkinsPage");
const fs_extra_1 = require("fs-extra");
const extract = require('extract-zip');
const JIRA_TICKET_LINK = 'https://jira.kindredgroup.com/browse/KCI-1053';
test_1.test.describe("For Kindred Jira with Login ticket", () => {
    (0, test_1.test)("Navigate to Release Request ticket", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
        // var versionPrefix:string = 'version: ' 
        yield test_1.test.step("Navigate to Url", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page.goto(JIRA_TICKET_LINK);
        }));
        yield test_1.test.step("Login into Jira", () => __awaiter(void 0, void 0, void 0, function* () {
            const loginPage = new KindredLoginPage_1.KindredLoginPage(page);
            yield loginPage.loginUser("vukadin.glogovac@kindredgroup.com", "Vanjaradovanovic30+");
        }));
        yield test_1.test.step("GetStatusAndVersion", () => __awaiter(void 0, void 0, void 0, function* () {
            const rrTicket = new ReleaseRequestTicket_1.ReleaseRequestTicket(page);
            const status = yield rrTicket.getReleaseRequestStatusText();
            //if(status.includes("Open")||status.includes("OPEN")||status.includes("open")){
            if (status.includes("Closed") || status.includes("CLOSED") || status.includes("closed")) {
                const component = yield rrTicket.getComponentText();
                var version = yield rrTicket.getVersionText();
                version = version.substring(version.lastIndexOf('-') + 1, version.length);
                yield page.goto(helpers_1.serviceMapLinks.get(component).deploymentLink);
                const deploymentPage = new DeploymentPage_1.DeploymentPage(page);
                var currentDeployedVersion = yield deploymentPage.getVersionText();
                currentDeployedVersion = currentDeployedVersion.substring(currentDeployedVersion.lastIndexOf(':') + 1, currentDeployedVersion.length).trim();
                if (!version.includes(yield deploymentPage.getVersionText())) {
                    const handler = new HandleDeployments_1.HandleDeployments();
                    yield handler.createPrAndMerge(version, deploymentPage);
                    yield page.goto(helpers_1.serviceMapLinks.get(component).kubernetesLink);
                    const kubePage = new KubernetesPage_1.KubernetesPage(page);
                    yield kubePage.clickCloseDialog();
                    var isDeployed = yield kubePage.isSameVersion(version);
                    if (isDeployed === true) {
                        yield page.goto(helpers_1.serviceMapLinks.get(component).jenkinsLink);
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
                                yield page.goto(JIRA_TICKET_LINK);
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
                    }
                    // page.on('dialog',async dialog => {
                    //   expect(dialog.type()).toContain('dialog')
                    //   dialog.dismiss()
                    // })
                }
            }
        }));
    }));
    (0, test_1.test)("Wait forr version to be deployedasda asd Kubernetes", ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
        var versionToDeploy = '0.0.84';
        yield test_1.test.step("Navigate to Url", () => __awaiter(void 0, void 0, void 0, function* () {
            yield page.goto("https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-intervention-service,app.kubernetes.io%2Fname%3Dkindred-affordability-intervention-service&namespace=affordability-intervention-service&appName=affordability-intervention-service&deploymentName=kindred-affordability-intervention-service&clusterServer=k8s.si1.kindredgroup.com");
        }));
        yield test_1.test.step("Check version", () => __awaiter(void 0, void 0, void 0, function* () {
            const kubePage = new KubernetesPage_1.KubernetesPage(page);
            yield kubePage.clickCloseDialog();
            var isDeployed = yield kubePage.isSameVersion(versionToDeploy);
            if (isDeployed === true) {
                yield page.goto("https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/qa1/job/affordability-intervention-service/");
            }
            yield (0, helpers_1.delay)(3000);
        }));
    }));
});
//# sourceMappingURL=kindredLogin.spec.js.map