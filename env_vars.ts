export interface ClusterEnvVars {
  projectId?: string;
  projectNumber?: string;
  clusterName?: string;
  clusterRegion?: string;
  clusterExternalIpName?: string;
  clusterInternalIpName?: string;
  highReadSpannerInstanceId?: string;
  balancedSpannerInstanceId?: string;
  bigtableInstanceId?: string;
  bigtableClusterId?: string;
  bigtableZone?: string;
  spannerRegion?: string;
  gcsSecretBucketName?: string;
  cloudflareAccountIdFile?: string;
  cloudflareR2AccessKeyIdFile?: string;
  cloudflareR2SecretAccessKeyFile?: string;
  timezoneNegativeOffset?: number;
  businessRegion?: string;
  externalOrigin?: string;
  internalOrigin?: string;
}

export let CLUSTER_ENV_VARS: ClusterEnvVars = {};
