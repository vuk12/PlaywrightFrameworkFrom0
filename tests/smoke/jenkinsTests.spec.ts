import { Page,test } from "@playwright/test";
import { delay } from "../../support/helpers";
import { JenkinsPage } from "../../pom/JenkinsPage";
import { KindredLoginPage } from "../../pom/KindredLoginPage";
import { ReleaseRequestTicket } from "../../pom/ReleaseRequestTicket";
// import { generateString } from "../../support/helpers" 
const extract = require('extract-zip')

test("Wait for Jenkins build to complete",async({page})=>{
    
    await test.step("Login into Jenkins", async () => {
        await page.goto("https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/qa1/job/se-affordability-gateway/"); 
        const loginPage = new KindredLoginPage(page)
        await loginPage.loginUser("vukadin.glogovac@kindredgroup.com", "Vanjaradovanovic30+")
      });

    await test.step("Navigate to Url", async () => {
    const jenkinsPage = new JenkinsPage(page) 
    await jenkinsPage.clickBuildNow(); 
    await jenkinsPage.progressBarNotPresent()
    const version = await jenkinsPage.getlastVersionBuild()

    if((await jenkinsPage.getBuildStatus()).includes('Success')){
        await jenkinsPage.clickLastBuildIcon()
        await jenkinsPage.clickReportLink()
        const downloadPromise = page.waitForEvent('download');
        await jenkinsPage.clickZipLink()
        const download = await downloadPromise;
        delay(2000)//who know how long it takes

        // const randomFileName = generateString(4)
        const fullFilePath = __dirname + download.suggestedFilename();
        console.log(fullFilePath) 
        await download.saveAs(fullFilePath);

        try {
            const destinationPath = __dirname+'/unzip';
            await extract(fullFilePath, { dir:destinationPath })
            console.log('Extraction complete')
            await page.goto("https://jira.kindredgroup.com/browse/KCI-915");

            const fileChooserPromise = page.waitForEvent('filechooser');
            const rrTicket = new ReleaseRequestTicket(page)
            await rrTicket.clickBrowseLink()
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(destinationPath+'/SE-extent-report/emailable-report.html');

          } catch (err) {
            console.log('Da nije mozda')
          }
    }
    await delay(3000)

    await page.goto("https://b92.net"); 
    await delay(3000)

    });
  });