import { CLUSTER_ENV_VARS } from "../env_vars";
import "../env_const";

CLUSTER_ENV_VARS.projectId = "phading-dev";
CLUSTER_ENV_VARS.projectNumber = "178489203789";
CLUSTER_ENV_VARS.clusterRegion = "us-central1";
CLUSTER_ENV_VARS.spannerRegion = "regional-us-central1";
CLUSTER_ENV_VARS.gcsSecretBucketName = "phading-dev-secrets";
CLUSTER_ENV_VARS.timezoneNegativeOffset = 8;
CLUSTER_ENV_VARS.timezoneIdentifier = "Pacific/Pitcairn";
CLUSTER_ENV_VARS.businessRegion = "USA";
CLUSTER_ENV_VARS.defaultCurrency = "USD";
CLUSTER_ENV_VARS.initCreditAmount = 100; // Initial credit amount for new users
CLUSTER_ENV_VARS.externalDomain = "dev.secount.com";
CLUSTER_ENV_VARS.externalOrigin = "https://" + CLUSTER_ENV_VARS.externalDomain;
CLUSTER_ENV_VARS.internalOrigin = "http://10.128.15.211"; // Updated after cluster creation
CLUSTER_ENV_VARS.supportEmail = "support-dev@secount.com";
CLUSTER_ENV_VARS.legalEmail = "legal-dev@secount.com";
CLUSTER_ENV_VARS.copyrightEmail = "copyright-dev@secount.com";
