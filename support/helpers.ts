
export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function generateString(length:number) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

type Links = { deploymentLink: string; kubernetesLink:string;jenkinsLink: string };

const intervention: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1/browse/affordability-intervention-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/affordability-intervention-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-intervention-service,app.kubernetes.io%2Fname%3Dkindred-affordability-intervention-service&namespace=affordability-intervention-service&appName=affordability-intervention-service&deploymentName=kindred-affordability-intervention-service&clusterServer=k8s.si1.kindredgroup.com'
  };

  const detection: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1.data1/browse/affordability-detection-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/affordability-detection-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-detection-service,app.kubernetes.io%2Fname%3Dkindred-affordability-detection-service&environment=si1.data1&namespace=affordability-detection-service&appName=affordability-detection-service&deploymentName=kindred-affordability-detection-service'
  };

export const serviceMapLinks = new Map<string, Links>([
    ["affordability-intervention-service", intervention],
    ["affordability-detection-service", detection]
]);