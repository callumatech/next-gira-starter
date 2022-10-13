#!make

ifeq ($(env),development)
	service=web-gira-starter-development
	task=WebGiraStarterDevelopmentFamily
	instances=1
	cluster=Infrastructure-Fargate-Development
endif

ifeq ($(env),staging)
	service=web-gira-starter-staging
	task=WebGiraStarterStagingFamily
	instances=1
	cluster=Infrastructure-Fargate-Development
endif

ifeq ($(env),production)
	service=web-gira-starter
	task=WebGiraStarterFamily
	instances=1
	cluster=Infrastructure-Fargate
endif

# ==================================================> Build

build:
	# export NPM_AUTH_TOKEN=xxxx (cat )~/.npmrc
	# make build env=development|staging
	echo $(NPM_AUTH_TOKEN)
	docker build -t web-gira-starter:$(env) -f ./Dockerfile --build-arg envFile=".env-$(env)" --build-arg NPM_AUTH_TOKEN=$(NPM_AUTH_TOKEN) ..

	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 887937850409.dkr.ecr.us-east-1.amazonaws.com
	docker tag web-gira-starter:$(env) 887937850409.dkr.ecr.us-east-1.amazonaws.com/web-gira-starter:$(env)
	docker push 887937850409.dkr.ecr.us-east-1.amazonaws.com/web-gira-starter:$(env)

# ==================================================> Deployment

deploy:
	echo "parameter: env=development|staging"
	sam deploy --config-env $(env)

# ==================================================> Operation

start:
	aws ecs update-service \
		--cluster $(cluster) \
		--service $(service) \
		--desired-count $(instances) \
		--task-definition $(task) \
		--output text --no-cli-pager

stop:
	aws ecs update-service \
		--cluster $(cluster) \
		--service $(service) \
		--desired-count 0 \
		--output text --no-cli-pager

restart:
	aws ecs update-service \
		--force-new-deployment \
		--service $(service) \
		--task-definition $(task) \
		--cluster $(cluster) \
		--output text --no-cli-pager
