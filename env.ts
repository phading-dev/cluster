declare interface ClusterEnvVars {
  projectId?: string;
  projectNumber?: string;
  clusterName?: string;
  clusterRegion?: string;
  clusterExternalIpName?: string;
  clusterInternalIpName?: string;
  highReadDbInstanceId?: string;
  balancedDbInstanceId?: string;
  dbRegion?: string;
  secretBucketName?: string;
  timezoneNegativeOffset?: number;
  businessRegion?: string;
}

export let CLUSTER_ENV_VARS: ClusterEnvVars = {};
