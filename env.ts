export interface ClusterEnvVars {
  projectId?: string;
  projectNumber?: string;
  clusterName?: string;
  clusterRegion?: string;
  clusterExternalIpName?: string;
  clusterInternalIpName?: string;
  highReadDbInstanceId?: string;
  balancedDbInstanceId?: string;
  dbRegion?: string;
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
