
import { KubernetesPage } from "../pom/KubernetesPage";
import { DeploymentPage } from "../pom/DeploymentPage";
import { delay } from "./helpers";

export class HandleDeployments{

    async createPrAndMerge(version:string, deploymentPage:DeploymentPage):Promise<void>{
        var versionPrefix:string = 'version: ' 

        await deploymentPage.clickEditButton()
        await deploymentPage.editVersionText(versionPrefix.concat(version))
        await deploymentPage.clickCommits()
        await delay(1000)
        await deploymentPage.waitForAutoMergeToComplete('[Auto] Update version to: '.concat(version))
        await delay(2000)
    }
}