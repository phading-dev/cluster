1. If not installed, run `sudo apt-get update && sudo apt-get install google-cloud-cli google-cloud-cli-cbt kubectl google-cloud-cli-gke-gcloud-auth-plugin`
1. Run `turnup.sh`.
1. Go to Cloudflare DNS record and point the domain to the external IP address created by GCP.
1. Go to Cloudflare and set up several emails routing.
1. Go to Google Cloud Storage and create a new bucket named as `phading-dev-secrets` or `phading-prod-secrets`. Select type `region` and location `us-central1`. No public access.
1. Go to Cloudflare and get its account id and upload to GCS.
1. Go to Cloudflare R2 storage and create a token, which generates access key id and secret access key, and upload those to GCS.
1. Go to Sendgrid and create an API key and upload the key to GCS.
1. Go to Sendgrid and under "sender authentication", authenticate the domain.
