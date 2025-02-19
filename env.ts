declare interface ClusterEnvVars {
  projectId?: string;
  projectNumber?: string;
  clusterRegion?: string;
  dbRegion?: string;
  secretBucketName?: string;
  timezoneNegativeOffset?: number;
  businessRegion?: string;
}

export let CLUSTER_ENV_VARS: ClusterEnvVars = {};
