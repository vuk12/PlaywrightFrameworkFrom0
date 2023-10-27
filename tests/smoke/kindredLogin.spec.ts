import { test, expect } from "@playwright/test";
import { KindredLoginPage } from "../../pom/KindredLoginPage";
import { ReleaseRequestTicket } from "../../pom/ReleaseRequestTicket";
import {serviceMapLinks} from "../../support/helpers"

test.describe("Kindred Jira with Login", () => {

  test("Login with user name and password", async ({ page }) => {
    await test.step("Navigate to Url", async () => {
      await page.goto("https://jira.kindredgroup.com/browse/KCI-1012");
    });
    await test.step("Login into app", async () => {
      const loginPage = new KindredLoginPage(page)
      await loginPage.loginUser("milanko", "Sifric")
    });
    await test.step("GetStatusAndVersion", async () => {
      const rrTicket = new ReleaseRequestTicket(page)
      const status =await rrTicket.getReleaseRequestStatusText()
      //if(status.includes("Open")||status.includes("OPEN")||status.includes("open")){
      if( status.includes("Closed")||  status.includes("CLOSED")|| status.includes("closed")){
          const component =await rrTicket.getComponentText()
          const version =await rrTicket.getVersionText()
          console.log(serviceMapLinks.get(component).deploymentLink)
          console.log(serviceMapLinks.get(component).jenkinsLink)
          console.log(version)
      }
    });
  });
});
