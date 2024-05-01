

up: 
	docker-compose up -d --build --no-deps

down:
	docker-compose down

build:
	docker build -t petarnenov/authapi . --no-cache

clean: down
	docker volume prune
