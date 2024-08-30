## Turnup of GKE cluster with a Spanner instance

1. Open Google Cloud Shell Editor.
1. Choose project `phading-dev` or `phading-prod`.

1. Run `gcloud container --project "phading-dev" clusters create-auto "core-services" --region "us-west1" --release-channel "regular" --network "projects/phading-dev/global/networks/default" --subnetwork "projects/phading-dev/regions/us-west1/subnetworks/default" --cluster-ipv4-cidr "/17" --binauthz-evaluation-mode=DISABLED`, replacing `phading-dev` with `phading-prod`, if for prod env.

1. Run `gcloud iam service-accounts create core-services-cluster-builder`
1. Run `gcloud projects add-iam-policy-binding phading-dev --member='serviceAccount:core-services-cluster-builder@phading-dev.iam.gserviceaccount.com' --role='roles/cloudbuild.builds.builder' --condition=None`, replacing `phading-dev` with `phading-prod`, if for prod env.
1. Run `gcloud projects add-iam-policy-binding phading-dev --member='serviceAccount:core-services-cluster-builder@phading-dev.iam.gserviceaccount.com' --role='roles/container.developer' --condition=None`, replacing `phading-dev` with `phading-prod`, if for prod env.
1. Go to cloud build and set up a new trigger. In source, it asks to set up a GitHub connection. Name it as `phading-dev`, choose the region `us-west-2`. Choose to install it in a new account `phading-dev`.
1. Name it as `core-services-cluster-builder`. Choose region in `us-west-2`. In event, choose `manual invocation`.  In source, choose the repo `core_services_cluster` and rename it manually as `core_services_cluster`. In configuration, choose `cloud build configuration file` and location as `Repository`. Use the service account created above. Then create.

1. Run `gcloud compute addresses create core-services-ip --global --ip-version IPV4`
1. Manually run the build.

1. Run `gcloud spanner instances create core-services-db --description=core-services-db --config=regional-us-east1 --processing-units=100` for dev, and `gcloud spanner instances create core-services-db --description=core-services-db --config=nam6 --nodes=3` for prod.

1. (Optional) After a Docker image is pushed. Go to "Artifact Registry" -> "Repositories" -> "gcr.io", and click "Edit repository" to add a cleanup policy, which is to delete untagged images older than 1 month.
