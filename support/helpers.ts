
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

type Links = { deploymentLink: string; kubernetesLink:string;jenkinsLink: string, report:string };

const interventionSi1: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1/browse/affordability-intervention-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/affordability-intervention-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-intervention-service,app.kubernetes.io%2Fname%3Dkindred-affordability-intervention-service&namespace=affordability-intervention-service&appName=affordability-intervention-service&deploymentName=kindred-affordability-intervention-service&clusterServer=k8s.si1.kindredgroup.com',
    report: 'aff-intervention-service-report'
  };

  const interventionQa1: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/qa1/browse/affordability-intervention-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/qa1/job/affordability-intervention-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-intervention-service,app.kubernetes.io%2Fname%3Dkindred-affordability-intervention-service&environment=qa1&namespace=affordability-intervention-service&appName=affordability-intervention-service&deploymentName=kindred-affordability-intervention-service',
    report: 'aff-intervention-service-report'
  };


  const detectionSi1: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1.data1/browse/affordability-detection-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/affordability-detection-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-detection-service,app.kubernetes.io%2Fname%3Dkindred-affordability-detection-service&environment=si1.data1&namespace=affordability-detection-service&appName=affordability-detection-service&deploymentName=kindred-affordability-detection-service',
    report: 'aff-detection-service-report'
  };

  const detectionQa1: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/qa1.data1/browse/affordability-detection-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/qa1/job/affordability-detection-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-detection-service,app.kubernetes.io%2Fname%3Dkindred-affordability-detection-service&namespace=affordability-detection-service&appName=affordability-detection-service&deploymentName=kindred-affordability-detection-service&clusterServer=k8s.qa1.d2-qa.aws.kindredgroup.com',
    report: 'aff-detection-service-report'
  };

  const affService: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1/browse/affordability-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/affordability-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Daffordability-service,app.kubernetes.io%2Fname%3Dkindred-affordability-service&namespace=affordability-service&appName=affordability-service&deploymentName=kindred-affordability-service&clusterServer=k8s.si1.kindredgroup.com',
    report: 'aff-service-report'
  };

  const xplatform: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1.data1/browse/xplatform-matching-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/xplatform-matching-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Dxplatform-matching-service,app.kubernetes.io%2Fname%3Dkindred-xplatform-matching-service&environment=si1.data1&namespace=xplatform-matching-service&appName=xplatform-matching-service&deploymentName=kindred-xplatform-matching-service',
    report: 'xplatform-extent-report'

  };

  const transUnion: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1/browse/transunion-gateway/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/transunion-gateway/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Dtransunion-gateway,app.kubernetes.io%2Fname%3Dkindred-transunion-gateway&namespace=transunion-gateway&appName=transunion-gateway&deploymentName=kindred-transunion-gateway&clusterServer=k8s.si1.kindredgroup.com',
    report: 'TU-extent-report'

  };

  const seGateway: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1/browse/se-affordability-gateway/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/se-affordability-gateway/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Dse-affordability-gateway,app.kubernetes.io%2Fname%3Dkindred-se-affordability-gateway&namespace=se-affordability-gateway&appName=se-affordability-gateway&deploymentName=kindred-se-affordability-gateway&clusterServer=k8s.si1.kindredgroup.com',
    report: 'SE-extent-report'

  };

  const kms: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1/browse/kindred-match-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/kindred-match-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Dkindred-match-service,app.kubernetes.io%2Fname%3Dkindred-kindred-match-service&namespace=kindred-match-service&appName=kindred-match-service&deploymentName=kindred-kindred-match-service&clusterServer=k8s.si1.kindredgroup.com',
    report: 'to be determine'

  };

  const kindredIdMatchQa1: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/qa1.data1/browse/ddp-rt-kindredid-matching-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/kindred-match-service/',
    kubernetesLink: 'https://k8s-console.pipeline.aws.kindredgroup.com/pods?labelSelector=app.kubernetes.io%2Finstance%3Dddp-rt-kindredid-matching-service,app.kubernetes.io%2Fname%3Dkindred-ddp-rt-kindredid-matching-service&namespace=ddp-rt-kindredid-matching-service&appName=ddp-rt-kindredid-matching-service&deploymentName=kindred-ddp-rt-kindredid-matching-service&clusterServer=k8s.qa1.d2-qa.aws.kindredgroup.com',
    report: 'kindredid-extent-report'
  };

  

export const serviceMapLinks = new Map<string, Links>([
    ["affordability-intervention-service", interventionQa1],
    ["affordability-detection-service", detectionQa1],
    ["affordability-service", affService],
    ["xplatform-matching-service", xplatform],
    ["transunion-gateway", transUnion],
    ["se-affordability-gateway", seGateway],
    ["kindred-match-service",kms],
    ["ddp-rt-kindredid-matching-service	",kindredIdMatchQa1]
    	
]);