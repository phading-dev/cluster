#!/usr/bin/env node
import fs = require("fs");
import { spawnSync } from "child_process";
import "./environment";

let turnupTemplate = `# GCP auth
gcloud auth application-default login
gcloud config set project ${globalThis.PROJECT_ID}

# External IP address
gcloud compute addresses create ${globalThis.CLUSTER_EXTERNAL_IP_NAME} --global --ip-version IPV4

# Internal IP address
gcloud compute addresses create ${globalThis.CLUSTER_INTERNAL_IP_NAME} --region=${globalThis.CLUSTER_REGION} --subnet=projects/${globalThis.PROJECT_ID}/regions/${globalThis.CLUSTER_REGION}/subnetworks/default --purpose=GCE_ENDPOINT

# GKE cluster
gcloud container clusters create-auto "${globalThis.CLUSTER_NAME}" --region "${globalThis.CLUSTER_REGION}" --release-channel "regular" --network "projects/${globalThis.PROJECT_ID}/global/networks/default" --subnetwork "projects/${globalThis.PROJECT_ID}/regions/${CLUSTER_REGION}/subnetworks/default" --cluster-ipv4-cidr "/17" --binauthz-evaluation-mode=DISABLED

# Create a proxy-only subnet for internal load balancer
gcloud compute networks subnets create proxy-only-subnet --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=${globalThis.CLUSTER_REGION} --network=default --range=10.0.0.0/23
gcloud compute firewall-rules create allow-proxy-connection --allow=TCP:0-65535 --source-ranges=10.0.0.0/23 --network=default

# Create Spanner instance
gcloud spanner instances create ${globalThis.BALANCED_DB_INSTANCE_ID} --config=${globalThis.DB_REGION} --description=${globalThis.BALANCED_DB_INSTANCE_ID} --edition=STANDARD --processing-units=100
`;

function main() {
  fs.writeFileSync("turnup_gen.sh", turnupTemplate);
  spawnSync("bash", ["turnup_gen.sh"], { stdio: "inherit" });
}

main();
