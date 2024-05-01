

up: 
	docker-compose up -d

down:
	docker-compose down

build:
	docker build -t petarnenov/authapi . --no-cache

clean: down
	docker volume prune
