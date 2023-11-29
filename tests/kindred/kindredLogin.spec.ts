import { test, expect } from "@playwright/test";
import { KindredLoginPage } from "../../pom/KindredLoginPage";
import { ReleaseRequestTicket } from "../../pom/ReleaseRequestTicket";
import { delay, serviceMapLinks } from "../../support/helpers"
import { DeploymentPage } from "../../pom/DeploymentPage";
import { KubernetesPage } from "../../pom/KubernetesPage";
import { HandleDeployments } from "../../support/HandleDeployments";
import { JenkinsPage } from "../../pom/JenkinsPage";
import { removeSync } from "fs-extra"
const extract = require('extract-zip');

const JIRA_TICKET_LINK = 'https://jira.kindredgroup.com/browse/KCI-1025'

//TODO:Dodaj kad se verzija poklapa da samo opali testove i da ih prikaci
test.describe("For Kindred Jira with Login ticket", () => {

  test("Navigate to Release Request ticket", async ({ page }) => {
    // var versionPrefix:string = 'version: ' 

    await test.step("Navigate to Url", async () => {
      await page.goto(JIRA_TICKET_LINK);
    });

    await test.step("Login into Jira", async () => {
      const loginPage = new KindredLoginPage(page)
      await loginPage.loginUser("ja", "sifra")
    });

    await test.step("GetStatusAndVersion", async () => {
      const rrTicket = new ReleaseRequestTicket(page)
      const status = await rrTicket.getReleaseRequestStatusText()
      if (status.includes("Open") || status.includes("OPEN") || status.includes("open") || status.includes("QA")) {
        // if( status.includes("Closed")||  status.includes("CLOSED")|| status.includes("closed")){
        const component = await rrTicket.getComponentText()
        var version = await rrTicket.getVersionText()
        version = version.substring(version.lastIndexOf('-') + 1, version.length)
        await page.goto(serviceMapLinks.get(component).deploymentLink);

        const deploymentPage = new DeploymentPage(page)
        var currentDeployedVersion = await deploymentPage.getVersionText()
        currentDeployedVersion = currentDeployedVersion.substring(currentDeployedVersion.lastIndexOf(':') + 1, currentDeployedVersion.length).trim()

        if (!version.includes(await deploymentPage.getVersionText())) {
          const handler = new HandleDeployments();
          await handler.createPrAndMerge(version, deploymentPage)
        }
        await page.goto(serviceMapLinks.get(component).kubernetesLink);

        const kubePage = new KubernetesPage(page)
        await kubePage.clickCloseDialog();
        var isDeployed = await kubePage.isSameVersion(version)
        if (isDeployed === true) {
          await page.goto(serviceMapLinks.get(component).jenkinsLink)
          const jenkinsPage = new JenkinsPage(page)
          await jenkinsPage.clickBuildNow();
          await jenkinsPage.progressBarNotPresent()
          const version = await jenkinsPage.getlastVersionBuild()

          if ((await jenkinsPage.getBuildStatus()).includes('Success')) {
            await jenkinsPage.clickLastBuildIcon()
            await jenkinsPage.clickReportLink()
            const downloadPromise = page.waitForEvent('download');

            var kmsZipFileName = await jenkinsPage.getKmsFileName()
            kmsZipFileName = kmsZipFileName.substring(0, kmsZipFileName.lastIndexOf('.'))

            if (component.includes('kindred-match-service')) {
              await jenkinsPage.clickKmsZipLink()
            }
            else {
              await jenkinsPage.clickZipLink()
            }
            const download = await downloadPromise;
            delay(2000)//who know how long it takes

            // const randomFileName = generateString(4)
            const fullFilePath = __dirname + download.suggestedFilename();
            console.log(fullFilePath)
            await download.saveAs(fullFilePath);

            try {
              const destinationPath = __dirname + '/unzip';
              await extract(fullFilePath, { dir: destinationPath })
              console.log('Extraction complete')
              await page.goto(JIRA_TICKET_LINK);

              const fileChooserPromise = page.waitForEvent('filechooser');
              const rrTicket = new ReleaseRequestTicket(page)
              await rrTicket.clickBrowseLink()
              const fileChooser = await fileChooserPromise;

              if (component.includes('kindred-match-service')) {
                await fileChooser.setFiles(destinationPath + '/' + kmsZipFileName + '/emailable-report.html');
              }
              else {
                await fileChooser.setFiles(destinationPath + '/' + serviceMapLinks.get(component).report + '/emailable-report.html');
              }
              removeSync(destinationPath);
            } catch (err) {
              console.log('Da nije mozda')
            }
          }
          await delay(3000)

          await page.goto("https://b92.net");
          await delay(3000)

        }

        // page.on('dialog',async dialog => {
        //   expect(dialog.type()).toContain('dialog')
        //   dialog.dismiss()
        // })
      }
    });
  });

  test("Wait forr version to be deployedasda asd Kubernetes", async ({ page }) => {
    var versionToDeploy = '0.0.84'
    await test.step("Navigate to Url", async () => {
      await page.goto("https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-intervention-service,app.kubernetes.io%2Fname%3Dkindred-affordability-intervention-service&namespace=affordability-intervention-service&appName=affordability-intervention-service&deploymentName=kindred-affordability-intervention-service&clusterServer=k8s.si1.kindredgroup.com");
    });

    await test.step("Check version", async () => {
      const kubePage = new KubernetesPage(page)
      await kubePage.clickCloseDialog();
      var isDeployed = await kubePage.isSameVersion(versionToDeploy)
      if (isDeployed === true) {
        await page.goto("https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/qa1/job/affordability-intervention-service/");

      }
      await delay(3000)
    });
  });



})