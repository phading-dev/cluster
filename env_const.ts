import { CLUSTER_ENV_VARS } from "./env_vars";
import { ProductID } from "@phading/price/platform_price";

CLUSTER_ENV_VARS.clusterName = "phading-cluster";
CLUSTER_ENV_VARS.clusterExternalIpName = "phading-cluster-external-ip";
CLUSTER_ENV_VARS.clusterInternalIpName = "phading-cluster-internal-ip";
CLUSTER_ENV_VARS.balancedSpannerInstanceId = "balanced-db-instance";
CLUSTER_ENV_VARS.singleBigtableInstanceId = "single-instance";
CLUSTER_ENV_VARS.bigtableClusterId = "single-cluster-c1";
CLUSTER_ENV_VARS.bigtableZone = "us-central1-a";
CLUSTER_ENV_VARS.cloudflareAccountIdFile = "cloudflare_account_id";
CLUSTER_ENV_VARS.cloudflareR2AccessKeyIdFile = "cloudflare_r2_access_key_id";
CLUSTER_ENV_VARS.cloudflareR2SecretAccessKeyFile =
  "cloudflare_r2_secret_access_key";
CLUSTER_ENV_VARS.sendgridApiKeyFile = "send_grid_api_key";
CLUSTER_ENV_VARS.topUpAbandonedAfterMs = 15 * 60 * 1000; // 15 minutes
CLUSTER_ENV_VARS.fundsHoldingPeriodMs = 10 * 24 * 60 * 60 * 1000; // 10 days
CLUSTER_ENV_VARS.externalGatewayName = "phading-gateway-external";
CLUSTER_ENV_VARS.internalGatewayName = "phading-gateway-internal";
CLUSTER_ENV_VARS.externalSslCertificateName = "phading-cluster-cert";

CLUSTER_ENV_VARS.exchangeRates = {
  rates: [
    {
      currency: "USD",
      description: "US Dollar",
      startMonth: "1970-01",
      endMonth: "9999-12",
      amount: 1,
      quantity: 1, // 1 COIN = 1 cent USD
    },
  ],
};
CLUSTER_ENV_VARS.platformPrices = {
  prices: [
    {
      // To match egress cost https://cloud.google.com/vpc/network-pricing, incurred by copy from GCS to Cloudflare R2.
      productID: ProductID.UPLOAD,
      description: "upload and processing",
      startMonth: "1970-01",
      endMonth: "9999-12",
      amount: 12,
      quantity: 1024, // 1 GiB
      unit: "MiB",
    },
    {
      productID: ProductID.STORAGE,
      description: "storage",
      startMonth: "1970-01",
      endMonth: "9999-12",
      amount: 15,
      quantity: 10 * 1024 * 30 * 24, // 10 GiB per month (30 days)
      unit: "MiB-hour",
    },
    {
      // No egress cost for Cloudflare R2 https://developers.cloudflare.com/r2/pricing/#r2-pricing.
      productID: ProductID.NETWORK,
      description: "network egress",
      startMonth: "1970-01",
      endMonth: "9999-12",
      amount: 0,
      quantity: 1024, // 1 GiB
      unit: "MiB",
    },
  ],
};
