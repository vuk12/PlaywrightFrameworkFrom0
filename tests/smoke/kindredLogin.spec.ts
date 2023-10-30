import { test, expect } from "@playwright/test";
import { KindredLoginPage } from "../../pom/KindredLoginPage";
import { ReleaseRequestTicket } from "../../pom/ReleaseRequestTicket";
import {delay, serviceMapLinks} from "../../support/helpers"
import { DeploymentPage } from "../../pom/DeploymentPage";
import { KubernetesPage } from "../../pom/KubernetesPage";
import { HandleDeployments } from "../../support/HandleDeployments";
import { JenkinsPage } from "../../pom/JenkinsPage";

test.describe("Kindred Jira with Login", () => {

  test("Navigate to Release Request ticket", async ({ page }) => {
    // var versionPrefix:string = 'version: ' 

    await test.step("Navigate to Url", async () => {
      await page.goto("https://jira.kindredgroup.com/browse/KCI-1012");
    });

    await test.step("Login into Jira", async () => {
      const loginPage = new KindredLoginPage(page)
      await loginPage.loginUser("vukadin.glogovac@kindredgroup.com", "Vanjaradovanovic30+")
    });
    
    await test.step("GetStatusAndVersion", async () => {
      const rrTicket = new ReleaseRequestTicket(page)
      const status =await rrTicket.getReleaseRequestStatusText()
      //if(status.includes("Open")||status.includes("OPEN")||status.includes("open")){
      if( status.includes("Closed")||  status.includes("CLOSED")|| status.includes("closed")){
          const component =await rrTicket.getComponentText()
          var version =await rrTicket.getVersionText()
          version = version.substring(version.lastIndexOf('-')+1,version.length)
            await page.goto(serviceMapLinks.get(component).deploymentLink);

          const deploymentPage = new DeploymentPage(page)
          var currentDeployedVersion = await deploymentPage.getVersionText()
          currentDeployedVersion= currentDeployedVersion.substring(currentDeployedVersion.lastIndexOf(':')+1,currentDeployedVersion.length).trim()

          if(!version.includes(await deploymentPage.getVersionText())){
            const handler = new HandleDeployments();
            await handler.createPrAndMerge(version,deploymentPage)
            await page.goto(serviceMapLinks.get(component).kubernetesLink);

            const kubePage = new KubernetesPage(page)
            await kubePage.clickCloseDialog();
            var isDeployed = await kubePage.isSameVersion(version)
            if(isDeployed===true){
              await page.goto(serviceMapLinks.get(component).jenkinsLink)
            }

            // page.on('dialog',async dialog => {
            //   expect(dialog.type()).toContain('dialog')
            //   dialog.dismiss()
            // })


          }
      }
    });
  });

  test("Wait for version to be deployed Kubernetes",async({page})=>{
    var versionToDeploy = '0.0.84'
    await test.step("Navigate to Url", async () => {
      await page.goto("https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-intervention-service,app.kubernetes.io%2Fname%3Dkindred-affordability-intervention-service&namespace=affordability-intervention-service&appName=affordability-intervention-service&deploymentName=kindred-affordability-intervention-service&clusterServer=k8s.si1.kindredgroup.com");
    });

    await test.step("Check version", async () => {
      const kubePage = new KubernetesPage(page)
      await kubePage.clickCloseDialog();
      var isDeployed = await kubePage.isSameVersion(versionToDeploy)
      if(isDeployed===true){
        await page.goto("https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/qa1/job/affordability-intervention-service/");

      }
      await delay(3000)
    });
  });



})