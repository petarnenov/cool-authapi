

up: 
	docker-compose up -d --no-deps authapi

down:
	docker-compose down

build:
	docker build -t petarnenov/authapi . --no-cache

clean: down
	docker volume prune
