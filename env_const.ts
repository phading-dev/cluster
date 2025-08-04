import { CLUSTER_ENV_VARS } from "./env_vars";

CLUSTER_ENV_VARS.clusterName = "phading-cluster";
CLUSTER_ENV_VARS.clusterExternalIpName = "phading-cluster-external-ip";
CLUSTER_ENV_VARS.clusterInternalIpName = "phading-cluster-internal-ip";
CLUSTER_ENV_VARS.balancedSpannerInstanceId = "balanced-db-instance";
CLUSTER_ENV_VARS.singleBigtableInstanceId = "single-instance";
CLUSTER_ENV_VARS.bigtableClusterId = "single-cluster-c1";
CLUSTER_ENV_VARS.bigtableZone = "us-central1-a";
CLUSTER_ENV_VARS.cloudflareAccountIdFile = "cloudflare_account_id";
CLUSTER_ENV_VARS.cloudflareR2AccessKeyIdFile = "cloudflare_r2_access_key_id";
CLUSTER_ENV_VARS.cloudflareR2SecretAccessKeyFile = "cloudflare_r2_secret_access_key";
CLUSTER_ENV_VARS.sendgridApiKeyFile = "send_grid_api_key";
CLUSTER_ENV_VARS.externalGatewayName = "phading-gateway-external";
CLUSTER_ENV_VARS.internalGatewayName = "phading-gateway-internal";
CLUSTER_ENV_VARS.platformName = "Secount";
CLUSTER_ENV_VARS.supportEmailName = `${CLUSTER_ENV_VARS.platformName} Support`;
CLUSTER_ENV_VARS.emailFooterYearAndCompany = "2025 Ykuyo, Inc.";
CLUSTER_ENV_VARS.emailFooterCompanyAddress = "1111B S Governors Ave STE 3363 Dover, DE 19904";
