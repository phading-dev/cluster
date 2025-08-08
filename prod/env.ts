import { CLUSTER_ENV_VARS } from "../env_vars";
import "../env_const";

CLUSTER_ENV_VARS.projectId = "phading-prod";
CLUSTER_ENV_VARS.projectNumber = "703213718960";
CLUSTER_ENV_VARS.clusterRegion = "us-central1";
CLUSTER_ENV_VARS.spannerRegion = "regional-us-central1";
CLUSTER_ENV_VARS.gcsSecretBucketName = "phading-prod-secrets";
CLUSTER_ENV_VARS.timezoneNegativeOffset = 8;
CLUSTER_ENV_VARS.timezoneIdentifier = "Pacific/Pitcairn";
CLUSTER_ENV_VARS.businessRegion = "USA";
CLUSTER_ENV_VARS.defaultCurrency = "USD";
CLUSTER_ENV_VARS.initCreditAmount = 1000; // Initial credit amount $10
CLUSTER_ENV_VARS.externalDomain = "www.secount.com";
CLUSTER_ENV_VARS.externalSynonymDomains = ["secount.com", "secounts.com", "www.secounts.com"];
CLUSTER_ENV_VARS.externalOrigin = "https://" + CLUSTER_ENV_VARS.externalDomain;
CLUSTER_ENV_VARS.internalOrigin = "http://10.128.0.2"; // Updated after cluster creation
CLUSTER_ENV_VARS.supportEmail = "support@secount.com";
CLUSTER_ENV_VARS.legalEmail = "legal@secount.com";
CLUSTER_ENV_VARS.copyrightEmail = "copyright@secount.com";
