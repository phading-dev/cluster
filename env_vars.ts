import { ExchangeRates } from "@phading/price/exchange_rate";
import { RevenueShares } from "@phading/price/revenue_share";
import { PlatformPrices } from "@phading/price/platform_price";

export enum PaymentProcessor {
  STRIPE = "stripe",
  CCBILL = "ccbill",
}

export interface ClusterEnvVars {
  projectId?: string;
  projectNumber?: string;
  clusterName?: string;
  clusterRegion?: string;
  clusterExternalIpName?: string;
  clusterInternalIpName?: string;
  balancedSpannerInstanceId?: string;
  singleBigtableInstanceId?: string;
  bigtableClusterId?: string;
  bigtableZone?: string;
  spannerRegion?: string;
  gcsSecretBucketName?: string;
  cloudflareAccountIdFile?: string;
  cloudflareR2AccessKeyIdFile?: string;
  cloudflareR2SecretAccessKeyFile?: string;
  sendgridApiKeyFile?: string;
  timezoneNegativeOffset?: number;
  timezoneIdentifier?: string;
  businessRegion?: string;
  defaultCurrency?: string;
  initCreditCoins?: number;
  minimumTopUpCoins?: number;
  topUpFixedFeeCoins?: number;
  exchangeRates?: ExchangeRates;
  revenueShares?: RevenueShares;
  platformPrices?: PlatformPrices;
  paymentProcessor?: PaymentProcessor;
  topUpAbandonedAfterMs?: number;
  fundsHoldingPeriodMs?: number;
  externalDomain?: string;
  externalOrigin?: string;
  externalSynonymDomains?: Array<string>;
  internalOrigin?: string;
  externalGatewayName?: string;
  internalGatewayName?: string;
  externalSslCertificateName?: string;
  platformName?: string;
  contactEmail?: string;
  supportEmailName?: string;
  supportEmail?: string;
  emailFooterYearAndCompany?: string;
  emailFooterCompanyAddress?: string;
  legalEmail?: string;
  copyrightEmail?: string;
}

export let CLUSTER_ENV_VARS: ClusterEnvVars = {};
