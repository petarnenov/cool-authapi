# set variables
greet := "Hello, world!"

up: 
	docker-compose up -d --force-recreate

down:
	docker-compose down
	docker image prune  

build:
	docker-compose build --force-rm --no-cache authapi
	make push

pull:	
	docker-compose pull authapi
	make up

push:
	docker-compose push authapi

clean: down
	docker volume prune

greet:
	@echo $(greet)

swarm:
	docker stack deploy -c docker-compose.yml authapi

#watchtower to detect changes in the image and update the container
