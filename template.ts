#!/usr/bin/env node
import fs = require("fs");
import { CLUSTER_ENV_VARS } from "./env";

let turnupTemplate = `# GCP auth
gcloud auth application-default login
gcloud config set project ${CLUSTER_ENV_VARS.projectId}

# External IP address
gcloud compute addresses create ${CLUSTER_ENV_VARS.clusterExternalIpName} --global --ip-version IPV4

# Internal IP address
gcloud compute addresses create ${CLUSTER_ENV_VARS.clusterInternalIpName} --region=${CLUSTER_ENV_VARS.clusterRegion} --subnet=projects/${CLUSTER_ENV_VARS.projectId}/regions/${CLUSTER_ENV_VARS.clusterRegion}/subnetworks/default --purpose=GCE_ENDPOINT

# GKE cluster
gcloud container clusters create-auto "${CLUSTER_ENV_VARS.clusterName}" --region "${CLUSTER_ENV_VARS.clusterRegion}" --release-channel "regular" --network "projects/${CLUSTER_ENV_VARS.projectId}/global/networks/default" --subnetwork "projects/${CLUSTER_ENV_VARS.projectId}/regions/${CLUSTER_ENV_VARS.clusterRegion}/subnetworks/default" --cluster-ipv4-cidr "/17" --binauthz-evaluation-mode=DISABLED

# Create a proxy-only subnet for internal load balancer
gcloud compute networks subnets create proxy-only-subnet --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=${CLUSTER_ENV_VARS.clusterRegion} --network=default --range=10.0.0.0/23
gcloud compute firewall-rules create allow-proxy-connection --allow=TCP:0-65535 --source-ranges=10.0.0.0/23 --network=default

# Create Spanner instance
gcloud spanner instances create ${CLUSTER_ENV_VARS.highReadDbInstanceId} --config=${CLUSTER_ENV_VARS.dbRegion} --description=${CLUSTER_ENV_VARS.highReadDbInstanceId} --edition=STANDARD --processing-units=100
gcloud spanner instances create ${CLUSTER_ENV_VARS.balancedDbInstanceId} --config=${CLUSTER_ENV_VARS.dbRegion} --description=${CLUSTER_ENV_VARS.balancedDbInstanceId} --edition=STANDARD --processing-units=100

# Create GCS bucket
gcloud storage buckets create gs://${CLUSTER_ENV_VARS.gcsSecretBucketName} --location=${CLUSTER_ENV_VARS.clusterRegion} --uniform-bucket-level-access
`;

function main() {
  let suffix = process.argv[2];
  fs.writeFileSync(`turnup_${suffix}.sh`, turnupTemplate);
}

main();
