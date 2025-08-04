import fs = require("fs");
import { CLUSTER_ENV_VARS } from "./env_vars";

export function generate(env: string) {
  let gatewayTemplate = `apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: ${CLUSTER_ENV_VARS.internalGatewayName}
spec:
  gatewayClassName: gke-l7-rilb
  listeners:
  - name: http
    protocol: HTTP
    port: 80
    allowedRoutes:
      namespaces:
        from: Same
  addresses:
  - type: NamedAddress
    value: ${CLUSTER_ENV_VARS.clusterInternalIpName}
---
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: ${CLUSTER_ENV_VARS.externalGatewayName}
spec:
  gatewayClassName: gke-l7-global-external-managed
  listeners:
  - name: https
    protocol: HTTPS
    port: 443
    tls:
      mode: Terminate
      options:
        networking.gke.io/pre-shared-certs: ${CLUSTER_ENV_VARS.clusterName}-cert
  - name: http
    protocol: HTTP
    port: 80
    allowedRoutes:
      namespaces:
        from: Same
  addresses:
  - type: NamedAddress
    value: ${CLUSTER_ENV_VARS.clusterExternalIpName}
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: ${CLUSTER_ENV_VARS.externalGatewayName}-https-redirect
spec:
  parentRefs:
  - name: ${CLUSTER_ENV_VARS.externalGatewayName}
    sectionName: http
  hostnames:
  - ${CLUSTER_ENV_VARS.externalDomain}
  rules:
  - filters:
    - type: RequestRedirect
      requestRedirect:
        scheme: https
        statusCode: 301
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: ${CLUSTER_ENV_VARS.externalGatewayName}-domain-redirect
spec:
  parentRefs:
  - name: ${CLUSTER_ENV_VARS.externalGatewayName}
  hostnames:${CLUSTER_ENV_VARS.externalSynonymDomains.map(domain => `\n  - ${domain}`).join("")}
  rules:
  - filters:
    - type: RequestRedirect
      requestRedirect:
        scheme: https
        hostname: ${CLUSTER_ENV_VARS.externalDomain}
        statusCode: 301
`
  fs.writeFileSync(`${env}/gateway.yaml`, gatewayTemplate);

  let turnupTemplate = `# GCP auth
gcloud auth application-default login
gcloud config set project ${CLUSTER_ENV_VARS.projectId}

# External IP address
gcloud compute addresses create ${CLUSTER_ENV_VARS.clusterExternalIpName} --global --ip-version IPV4

# Internal IP address
gcloud compute addresses create ${CLUSTER_ENV_VARS.clusterInternalIpName} --region=${CLUSTER_ENV_VARS.clusterRegion} --subnet=projects/${CLUSTER_ENV_VARS.projectId}/regions/${CLUSTER_ENV_VARS.clusterRegion}/subnetworks/default --purpose=GCE_ENDPOINT

# Google-managed SSL certificate
gcloud compute ssl-certificates create ${CLUSTER_ENV_VARS.clusterName}-cert --domains=${[CLUSTER_ENV_VARS.externalDomain, ...CLUSTER_ENV_VARS.externalSynonymDomains].join(",")} --global

# GKE cluster
gcloud container clusters create-auto "${CLUSTER_ENV_VARS.clusterName}" --region "${CLUSTER_ENV_VARS.clusterRegion}" --release-channel "regular" --network "projects/${CLUSTER_ENV_VARS.projectId}/global/networks/default" --subnetwork "projects/${CLUSTER_ENV_VARS.projectId}/regions/${CLUSTER_ENV_VARS.clusterRegion}/subnetworks/default" --cluster-ipv4-cidr "/17" --binauthz-evaluation-mode=DISABLED

# Create a proxy-only subnet for internal load balancer
gcloud compute networks subnets create proxy-only-subnet --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=${CLUSTER_ENV_VARS.clusterRegion} --network=default --range=10.0.0.0/23
gcloud compute firewall-rules create allow-proxy-connection --allow=TCP:0-65535 --source-ranges=10.0.0.0/23 --network=default

# Create Spanner instance
gcloud spanner instances create ${CLUSTER_ENV_VARS.balancedSpannerInstanceId} --config=${CLUSTER_ENV_VARS.spannerRegion} --description=${CLUSTER_ENV_VARS.balancedSpannerInstanceId} --edition=ENTERPRISE --processing-units=100

# Create Bigtable instance
cbt -project ${CLUSTER_ENV_VARS.projectId} createinstance ${CLUSTER_ENV_VARS.singleBigtableInstanceId} "${CLUSTER_ENV_VARS.singleBigtableInstanceId}" ${CLUSTER_ENV_VARS.bigtableClusterId} ${CLUSTER_ENV_VARS.bigtableZone} 1 SSD

# Apply gateway
kubectl apply -f ${env}/gateway.yaml
`;
  fs.writeFileSync(`${env}/turnup.sh`, turnupTemplate);
}

import "./dev/env";
generate("dev");

import "./prod/env";
generate("prod");
