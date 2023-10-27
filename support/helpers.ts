
export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

type Links = { deploymentLink: string; jenkinsLink: string };

const intervention: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1/browse/affordability-intervention-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/affordability-intervention-service/'
  };

  const detection: Links = {
    deploymentLink: 'https://bitbucket.kindredgroup.com/bitbucket/projects/DEPLOY/repos/si1.data1/browse/affordability-detection-service/release-data.yaml',
    jenkinsLink: 'https://kci-jenkins.pipeline.aws.kindredgroup.com/job/integration-tests/job/si1/job/affordability-detection-service/'
  };

export const serviceMapLinks = new Map<string, Links>([
    ["affordability-intervention-service", intervention],
    ["affordability-detection-service", detection]
]);