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
  timezoneNegativeOffset?: number;
  timezoneIdentifier?: string;
  businessRegion?: string;
  defaultCurrency?: string;
  externalDomain?: string;
  externalOrigin?: string;
  internalOrigin?: string;
  contactEmail?: string;
}

export let CLUSTER_ENV_VARS: ClusterEnvVars = {};
