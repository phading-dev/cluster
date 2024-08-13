## Create ECR repo

```shell
$ aws ecr create-repository --repository-name user_service
```

## Create CodeBuild

Go to `https://us-east-1.console.aws.amazon.com/iam/home#/roles` to create a service role `user-service-builder-role`. Attach `AmazonEC2ContainerRegistryPowerUser` and `AmazonEKSWorkerNodePolicy` to it.

`https://us-east-1.console.aws.amazon.com/codesuite/codebuild` to create a new project with the following settings. Name: `user_service`. Source provider: `Github` (get authorized to Github for the first time). Choose repo: `https://github.com/phading-dev/user_service.git`. In environment, choose to use the existing service role `user-service-builder-role`. And in environment's additional config, look for environment variables with `name=AWS_ECR_URL,value=964200069540.dkr.ecr.us-east-1.amazonaws.com,type=Plaintext;name=ECR_REPO_NAME,value=user_service,type=plaintext;name=REGION,value=us-east-1,type=Plaintext;`. In buildspec, use a buildspec file. In artficats, choose no artifacts.

## Install eksctl

Reference [here](https://eksctl.io/installation/).

```shell
# for ARM systems, set ARCH to: `arm64`, `armv6` or `armv7`
ARCH=amd64
PLATFORM=$(uname -s)_$ARCH

curl -sLO "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"

# (Optional) Verify checksum
curl -sL "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_checksums.txt" | grep $PLATFORM | sha256sum --check

tar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && rm eksctl_$PLATFORM.tar.gz

sudo mv /tmp/eksctl /usr/local/bin
```

## Create EKS cluster and deployment

```shell
$ eksctl create cluster -f cluster.yaml
$ eksctl create nodegroup -f cluster.yaml
$ eksctl utils associate-iam-oidc-provider --region=us-east-1 --cluster=core-services-dev --approve
$ eksctl create iamserviceaccount -f cluster.yaml --approve
$ kubectl apply -f deployment.yaml
$ kubectl apply -f service.yaml
```

## Set log retention

Go to https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups, select all, and click on "Actions -> Edit retention settings" amd select "3 months".

## Create Prometheus Scrapers

Go to EKS and choose "observability" (https://us-east-1.console.aws.amazon.com/eks/home?region=us-east-1#/clusters/core-services-dev?selectedTab=cluster-logging-tab). Click "Create scraper" with default settings, except removing public subnets (otherwise it complains).

## Create EKS ingress/load balancer

```shell
$ kubectl apply -f ingress.yaml
```

The ingress is created but not in effect because a load balancer controller needs to be installed. Start following https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html.

```shell
$ curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.7.2/docs/install/iam_policy.json
$ aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
$ eksctl utils associate-iam-oidc-provider --region=us-east-1 --cluster=core-services-dev --approve # Skip if already done.
$ eksctl create iamserviceaccount --cluster=core-services-dev --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-arn=arn:aws:iam::964200069540:policy/AWSLoadBalancerControllerIAMPolicy --approve
```

Note that the "service account" is created inside the k8s cluster, not in aws. Next install `helm` as the installer for the controller, following https://helm.sh/docs/intro/install/.

```shell
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

Now continuing https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html#lbc-helm-install.

```shell
$ helm repo add eks https://aws.github.io/eks-charts
$ helm repo update eks
$ helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=core-services-dev --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
```

## Create S3 to store password

```shell
$ aws s3api create-bucket --bucket user-service-secrets --region us-east-1
```

Then upload a file that stored the password.

## Create Aurora-MySQL database

The following creates a dev database using Aurora-MySQL, single instance, and using private subnets and security groups created by `eksctl create cluster`. 

```shell
$ aws rds create-db-subnet-group --db-subnet-group-name user-service-db-subnet-group --db-subnet-group-description "DB subnet group for user service." --subnet-ids '["subnet-027bf3059df689fa9","subnet-0bad505c228228294"]'
$ aws rds create-db-cluster --database-name UserServiceDb --db-cluster-identifier user-service-db-cluster --db-subnet-group-name user-service-db-subnet-group --vpc-security-group-ids sg-0656f921e20f4b4e4 --engine aurora-mysql --port 3306 --master-username root --master-user-password <Stored password> --engine-mode provisioned --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=32 --storage-encrypted
$ aws rds create-db-instance --db-instance-identifier user-service-db --db-cluster-identifier user-service-db-cluster --db-instance-class db.serverless --engine aurora-mysql
```

## Maintenance

### Rollout new binary

Go to `https://us-east-1.console.aws.amazon.com/codesuite/codebuild` and start a new build. 

```shell
$ kubectl rollout restart deployment/user-service-deployment
```

### Check logs directly

```shell
$ kubectl logs deployment/user-service-deployment
```
