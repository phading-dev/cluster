import "../env_const";
import { CLUSTER_ENV_VARS, PaymentProcessor } from "../env_vars";
import { AccountGroup, ProductType } from "@phading/price/revenue_share";

CLUSTER_ENV_VARS.projectId = "phading-prod";
CLUSTER_ENV_VARS.projectNumber = "703213718960";
CLUSTER_ENV_VARS.clusterRegion = "us-central1";
CLUSTER_ENV_VARS.spannerRegion = "regional-us-central1";
CLUSTER_ENV_VARS.gcsSecretBucketName = "phading-prod-secrets";
CLUSTER_ENV_VARS.timezoneNegativeOffset = 8;
CLUSTER_ENV_VARS.timezoneIdentifier = "Pacific/Pitcairn";
CLUSTER_ENV_VARS.businessRegion = "USA";
CLUSTER_ENV_VARS.defaultCurrency = "USD";
CLUSTER_ENV_VARS.initCreditCoins = 1000; // Initial credit amount $10
CLUSTER_ENV_VARS.paymentProcessor = PaymentProcessor.STRIPE;
CLUSTER_ENV_VARS.externalDomain = "www.secount.com";
CLUSTER_ENV_VARS.externalSynonymDomains = [
  "secount.com",
  "secounts.com",
  "www.secounts.com",
];
CLUSTER_ENV_VARS.externalOrigin = "https://" + CLUSTER_ENV_VARS.externalDomain;
CLUSTER_ENV_VARS.internalOrigin = "http://10.128.0.2"; // Updated after cluster creation
CLUSTER_ENV_VARS.platformName = "Secount";
CLUSTER_ENV_VARS.contactEmail = "contact@secount.com";
CLUSTER_ENV_VARS.supportEmail = "support@secount.com";
CLUSTER_ENV_VARS.supportEmailName = `${CLUSTER_ENV_VARS.platformName} Support`;
CLUSTER_ENV_VARS.emailFooterYearAndCompany = "2025 Ykuyo, Inc.";
CLUSTER_ENV_VARS.emailFooterCompanyAddress =
  "1111B S Governors Ave STE 3363 Dover, DE 19904";
CLUSTER_ENV_VARS.legalEmail = "legal@secount.com";
CLUSTER_ENV_VARS.copyrightEmail = "copyright@secount.com";

CLUSTER_ENV_VARS.minimumTopUpCoins = 100; // Minimum top-up amount $1
CLUSTER_ENV_VARS.topUpFixedFeeCoins = 30; // Top-up fixed fee $0.30 of Stripe
CLUSTER_ENV_VARS.revenueShares = {
  shares: [
    {
      productType: ProductType.MISC,
      accountGroup: AccountGroup.NORMAL,
      description: "Miscellaneous",
      startMonth: "1970-01",
      endMonth: "9999-12",
      sharePercent: 97, // Non-refundable. Pass-through chargebacks.
    },
    {
      productType: ProductType.TIP,
      accountGroup: AccountGroup.NORMAL,
      description: "Tip",
      startMonth: "1970-01",
      endMonth: "9999-12",
      sharePercent: 97, // Non-refundable. Pass-through chargebacks.
    },
    {
      productType: ProductType.SUBSCRIPTION,
      accountGroup: AccountGroup.NORMAL,
      description: "Subscription",
      startMonth: "1970-01",
      endMonth: "9999-12",
      sharePercent: 95, // Refundable. Absorb chargebacks.
    },
    {
      productType: ProductType.VIDEO_RENTAL,
      accountGroup: AccountGroup.NORMAL,
      description: "Video rental",
      startMonth: "1970-01",
      endMonth: "9999-12",
      sharePercent: 95, // Refundable. Absorb chargebacks.
    },
    {
      productType: ProductType.VIDEO_METERING,
      accountGroup: AccountGroup.NORMAL,
      description: "Video metering",
      startMonth: "1970-01",
      endMonth: "9999-12",
      sharePercent: 95, // Non-refundable. Absorb chargebacks.
    },
  ],
};
