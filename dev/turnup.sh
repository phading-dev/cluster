# GCP auth
gcloud auth application-default login
gcloud config set project undefined

# External IP address
gcloud compute addresses create undefined --global --ip-version IPV4

# Internal IP address
gcloud compute addresses create undefined --region=undefined --subnet=projects/undefined/regions/undefined/subnetworks/default --purpose=GCE_ENDPOINT

# GKE cluster
gcloud container clusters create-auto "undefined" --region "undefined" --release-channel "regular" --network "projects/undefined/global/networks/default" --subnetwork "projects/undefined/regions/undefined/subnetworks/default" --cluster-ipv4-cidr "/17" --binauthz-evaluation-mode=DISABLED

# Create a proxy-only subnet for internal load balancer
gcloud compute networks subnets create proxy-only-subnet --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=undefined --network=default --range=10.0.0.0/23
gcloud compute firewall-rules create allow-proxy-connection --allow=TCP:0-65535 --source-ranges=10.0.0.0/23 --network=default

# Create Spanner instance
gcloud spanner instances create undefined --config=undefined --description=undefined --edition=STANDARD --processing-units=100
gcloud spanner instances create undefined --config=undefined --description=undefined --edition=STANDARD --processing-units=100
