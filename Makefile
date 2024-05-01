

up: 
	docker-compose up -d --force-recreate

down:
	docker-compose down

build: down
	docker build --no-cache -t authapi . 

clean: down
	docker volume prune
