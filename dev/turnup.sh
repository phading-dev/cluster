# GCP auth
gcloud auth application-default login
gcloud config set project phading-dev

# External IP address
gcloud compute addresses create phading-cluster-external-ip --global --ip-version IPV4

# Internal IP address
gcloud compute addresses create phading-cluster-internal-ip --region=us-central1 --subnet=projects/phading-dev/regions/us-central1/subnetworks/default --purpose=GCE_ENDPOINT

# Google-managed SSL certificate
gcloud compute ssl-certificates create phading-cluster-cert --domains=dev.secount.com,dev-2.secount.com --global

# GKE cluster
gcloud container clusters create-auto "phading-cluster" --region "us-central1" --release-channel "regular" --network "projects/phading-dev/global/networks/default" --subnetwork "projects/phading-dev/regions/us-central1/subnetworks/default" --cluster-ipv4-cidr "/17" --binauthz-evaluation-mode=DISABLED

# Create a proxy-only subnet for internal load balancer
gcloud compute networks subnets create proxy-only-subnet --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=us-central1 --network=default --range=10.0.0.0/23
gcloud compute firewall-rules create allow-proxy-connection --allow=TCP:0-65535 --source-ranges=10.0.0.0/23 --network=default

# Create Spanner instance
gcloud spanner instances create balanced-db-instance --config=regional-us-central1 --description=balanced-db-instance --edition=ENTERPRISE --processing-units=100

# Create Bigtable instance
cbt -project phading-dev createinstance single-instance "single-instance" single-cluster-c1 us-central1-a 1 SSD
